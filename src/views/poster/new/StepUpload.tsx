import { useState } from 'react'

import { ActionButton } from '@components/custom/button'
import type { WizardStepProps } from '@ts/wizardStep'
import { ArrowRight, Upload } from 'lucide-react'

export const StepUpload = (props: WizardStepProps) => {
  const { onNext } = props
  const [file, setFile] = useState<File | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  return (
    <div className='flex flex-col items-center justify-center border border-dashed border-muted-foreground/50 rounded-lg p-10 w-full h-[300px] text-center'>
      <input type='file' id='file' className='hidden' onChange={handleFile} />
      <label htmlFor='file' className='cursor-pointer flex flex-col items-center'>
        <Upload className='w-8 h-8 text-muted-foreground mb-2' />
        <p className='text-sm text-muted-foreground'>
          {file ? file.name : 'Drag & drop your file or click to browse'}
        </p>
      </label>
      <ActionButton onClick={onNext}>
        <span className='mr-2'>Next</span>
        <ArrowRight size={20} />
      </ActionButton>
    </div>
  )
}
