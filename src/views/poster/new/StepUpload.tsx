import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import { createJob } from '@api/poster'
import { ActionButton } from '@components/custom/button'
import { ImagePreview } from '@components/custom/viewer'
import { Button } from '@components/ui/button'
import { useAudioRecorder } from '@hooks/useAudioRecorder'
import { usePosterForm } from '@hooks/usePosterForm'
import { compressImage } from '@lib/uplooader'
import { cn } from '@lib/utils'
import type { WizardStepProps } from '@ts/poster'
import { ArrowRight, Loader2, Mic, Plus, Square, UploadCloud } from 'lucide-react'
import { useWatch } from 'react-hook-form'
import { toast } from 'sonner'

export const StepUpload = (props: WizardStepProps) => {
  const { onNext } = props
  const { isRecording, audioFile: auFile, startRecording, stopRecording } = useAudioRecorder()
  const { setValue, control } = usePosterForm()

  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [isCompressing, setIsCompressing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { image: imageFile, audio: audioFile } = useWatch({ control })

  const imageRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLInputElement>(null)

  const handleImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsCompressing(true)
    const f = e.target.files?.[0]
    if (f) {
      const thisFile = await compressImage(f)
      setValue('image', thisFile, { shouldValidate: true })
    }
    if (imageRef.current) imageRef.current.value = ''
    setIsCompressing(false)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDrag(true)
  }

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDrag(false)
    setIsCompressing(true)
    if (event.dataTransfer.files.length > 0) {
      const thisFile = await compressImage(event.dataTransfer.files[0])
      setValue('image', thisFile, { shouldValidate: true })
    }
    if (imageRef.current) imageRef.current.value = ''
    setIsCompressing(false)
  }

  const handleAudioFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setValue('audio', f, { shouldValidate: true })
  }

  useEffect(() => {
    if (auFile) setValue('audio', auFile, { shouldValidate: true })
  }, [auFile, setValue])

  const { mutateAsync }: any = createJob()
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await mutateAsync()
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Success')
        onNext?.({ id: res?.data?.jobId })
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to create job')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='md:w-3/4 lg:w-2/3 mx-auto'>
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
      <div
        className={cn(
          'flex flex-col items-center justify-center border-3 border-gray-100 rounded-lg p-1 w-full h-[60vh] shadow-sm',
          isDrag ? 'bg-primary-radial' : 'bg-gray-100/10'
        )}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDrag(false)}
          onDrop={handleFileDrop}
          className='cursor-pointer flex flex-col flex-1 w-full items-center justify-center p-5'
          onClick={() => imageRef.current?.click()}>
          {imageFile ? (
            <>
              <ImagePreview file={imageFile} size={200} />
              <div className='text-[10pt] mt-1'>{imageFile.name}</div>
            </>
          ) : (
            <>
              {isCompressing ? (
                <Loader2 size={25} className='animate-spin text-gray-500 mb-2' />
              ) : (
                <UploadCloud size={25} className='text-gray-500 mb-2' />
              )}
              <div className=''>
                {isCompressing ? 'Preparing image...' : 'Upload your product image'}
              </div>
              <div className='text-[10pt] text-gray-500 text-center'>
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
            variant={isRecording ? 'secondary' : 'ghost'}
            size='icon'
            className='text-muted-foreground'
            onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? <Square className='w-4 h-4' fill='#000' /> : <Mic className='w-4 h-4' />}
          </Button>
          <div className='ms-1'>
            <ActionButton
              disabled={!imageFile || !audioFile}
              onClick={handleSubmit}
              isLoading={isLoading}>
              <span className='mr-2'>Next</span>
              <ArrowRight size={20} />
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}
