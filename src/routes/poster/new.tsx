import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'

import { PosterFormProvider } from '@hooks/usePosterForm'
import { StepProcessing } from '@views/poster/new/StepProcessing'
import { StepResults } from '@views/poster/new/StepResults'
import { StepSettings } from '@views/poster/new/StepSettings'
import { StepUpload } from '@views/poster/new/StepUpload'
import { WizardSteps } from '@views/poster/new/WizardLayout'
import { BadgeCheck, ScanText, Settings2, UploadCloud } from 'lucide-react'

const steps = [
  { id: 1, label: 'Upload', component: StepUpload, icon: UploadCloud },
  { id: 2, label: 'Settings', component: StepSettings, icon: Settings2 },
  { id: 3, label: 'Processing', component: StepProcessing, icon: ScanText },
  { id: 4, label: 'Results', component: StepResults, icon: BadgeCheck },
]

export default function PosterNewPage() {
  const search: { step?: string } = useSearch({ from: '/poster/new' })
  const navigate: any = useNavigate()

  const step = Number(search.step ?? 1)

  const nextStep = (params) =>
    navigate({
      search: {
        ...search,
        step: Math.min(step + 1, steps.length),
        ...(params?.id ? { id: params?.id } : {}),
      },
      replace: true,
    })

  const prevStep = () =>
    navigate({
      search: { ...search, step: Math.max(step - 1, 1) },
      replace: true,
    })

  const ActiveStep = steps.find((s) => s.id === step)?.component ?? StepUpload

  return (
    <PosterFormProvider>
      <form>
        <div className='py-5 mt-3'>
          <h1 className='text-[16pt] font-medium text-center'>Create Your Poster</h1>
          <h1 className='text-[12pt] text-center text-gray-500 mb-10'>
            Upload your files and let AI do the magic
          </h1>

          <div className='md:w-3/4 lg:w-1/2 mx-auto'>
            <WizardSteps currentStep={step} steps={steps} />
          </div>

          <div className='mt-8'>
            <ActiveStep onNext={nextStep} onPrev={prevStep} />
          </div>
        </div>
      </form>
    </PosterFormProvider>
  )
}

export const Route = createFileRoute('/poster/new')({ component: PosterNewPage })
