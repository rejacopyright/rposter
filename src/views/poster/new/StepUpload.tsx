import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import { ActionButton } from '@components/custom/button'
import { ImagePreview } from '@components/custom/viewer'
import { Button } from '@components/ui/button'
import { useAudioRecorder } from '@hooks/useAudioRecorder'
import { usePosterForm } from '@hooks/usePosterForm'
import type { WizardStepProps } from '@ts/wizardStep'
import { ArrowRight, Mic, Plus, Square, UploadCloud } from 'lucide-react'

export const StepUpload = (props: WizardStepProps) => {
  const { onNext } = props
  const { isRecording, audioFile: auFile, startRecording, stopRecording } = useAudioRecorder()
  const { setValue, watch } = usePosterForm()

  const imageFile = watch('image')
  const audioFile = watch('audio')

  const [, setTicked] = useState<number>(0)

  const imageRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLInputElement>(null)

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setValue('image', f, { shouldValidate: true })
      setTicked((t) => t + 1)
    }
  }

  const handleAudioFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setValue('audio', f, { shouldValidate: true })
      setTicked((t) => t + 1)
    }
  }

  useEffect(() => {
    if (auFile) {
      setValue('audio', auFile, { shouldValidate: true })
      setTicked((t) => t + 1)
    }
  }, [auFile, setValue])

  return (
    <>
      <input
        type='file'
        className='hidden'
        ref={imageRef}
        onChange={handleImageFile}
        accept='image/png, image/jpeg, image/jpg'
      />
      <input
        type='file'
        className='hidden'
        ref={audioRef}
        onChange={handleAudioFile}
        accept='.mp3, .m4a, .wav, audio/mpeg, audio/mp4, audio/wav'
      />
      <div className='flex flex-col items-center justify-center border-3 border-gray-100 bg-gray-100/10 rounded-lg p-1 w-full h-[60vh] shadow-sm'>
        <div
          className='cursor-pointer flex flex-col flex-1 w-full items-center justify-center p-5'
          onClick={() => imageRef.current?.click()}>
          {imageFile ? (
            <>
              <ImagePreview file={imageFile} size={200} />
              <div className='text-[10pt] mt-1'>{imageFile.name}</div>
            </>
          ) : (
            <>
              <UploadCloud className='w-6 h-6 text-gray-500 mb-2' />
              <div className=''>Upload your product image</div>
              <div className='text-[10pt] text-gray-500'>
                Drag and drop your file here or click to browse. Supports JPG & PNG up to 10 MB.
              </div>
            </>
          )}
          {!!audioFile && (
            <div className='mt-1 w-3/4 scale-75'>
              <audio
                controls
                src={URL.createObjectURL(audioFile)}
                className='mt-2 w-full rounded-md'
              />
            </div>
          )}
        </div>
        <div className='flex w-full h-auto items-center rounded-lg border border-input bg-background p-1 shadow-sm'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='text-muted-foreground'
            onClick={() => audioRef.current?.click()}>
            <Plus className='h-4 w-4' />
          </Button>

          <input
            type='text'
            onClick={() => audioRef.current?.click()}
            readOnly
            placeholder='Press the mic and start describing your image, or simply upload it...'
            className='flex-1 bg-transparent px-3 text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/70'
          />

          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='text-muted-foreground'
            onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? <Square className='w-4 h-4' /> : <Mic className='w-4 h-4' />}
          </Button>
          <div className='ms-1'>
            <ActionButton disabled={!imageFile || !audioFile} onClick={onNext}>
              <span className='mr-2'>Next</span>
              <ArrowRight size={20} />
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  )
}
