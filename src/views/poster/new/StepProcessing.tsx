import { Button } from '@components/ui/button'
import type { WizardStepProps } from '@ts/wizardStep'

export const StepProcessing = (props: WizardStepProps) => {
  const { onNext, onPrev } = props
  return (
    <div className='text-center'>
      <p className='text-muted-foreground mb-4'>Processing your poster...</p>
      <div className='flex justify-center gap-4'>
        <Button variant='outline' onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}
