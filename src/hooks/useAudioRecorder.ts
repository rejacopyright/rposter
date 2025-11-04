import { useRef, useState } from 'react'

import { toast } from 'sonner'

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioBase64, setAudioBase64] = useState<string | null>(null)
  const [convertedFile, setConvertedFile] = useState<File | null>(null)
  const [convertedBase64, setConvertedBase64] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Array<BlobPart>>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunks.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setAudioBlob(blob)

        const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
        setAudioFile(file)

        const reader = new FileReader()
        reader.onloadend = () => setAudioBase64(reader.result as string)
        reader.readAsDataURL(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch {
      toast.error('Microphone access denied. Make sure you have granted permission.')
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const resetRecording = () => {
    setAudioURL(null)
    setAudioBlob(null)
    setAudioFile(null)
    setAudioBase64(null)
    setConvertedFile(null)
    setConvertedBase64(null)
    setIsRecording(false)
  }

  return {
    isRecording,
    audioURL,
    audioBlob,
    audioFile,
    audioBase64,
    convertedFile,
    convertedBase64,
    startRecording,
    stopRecording,
    resetRecording,
  }
}
