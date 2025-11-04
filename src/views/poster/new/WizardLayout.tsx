import { motion } from 'framer-motion'
import { CircleCheck, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

import { cn } from '@/lib/utils'

interface StepDef {
  id: number
  label: string
  icon: ComponentType<LucideProps>
}

export function WizardSteps({
  currentStep,
  steps,
}: {
  currentStep: number
  steps: Array<StepDef>
}) {
  return (
    <div className='flex items-center justify-between mb-8'>
      {steps.map((step, idx) => {
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id
        const isLast = idx === steps.length - 1
        const isFirst = idx === 0
        // const isAnimate = currentStep + 1 > step.id

        return (
          <div key={step.id} className='flex-1'>
            <div className='text-center relative'>
              <div
                className={cn('timeline-horizontal left-1/2 bg-gray-200', { 'w-full': !isLast })}
                style={{ transformOrigin: 'left center' }}
              />

              <div
                className={cn(
                  'timeline-horizontal bg-primary transition-all duration-750',
                  isActive || isCompleted ? 'bg-primary' : 'bg-gray-200',
                  { 'left-1/2': isFirst }
                )}
                style={{
                  width: !isLast && (isCompleted || isActive) ? '100%' : '50%',
                  transformOrigin: 'left center',
                }}
              />

              <motion.div
                animate={{
                  y: isActive ? [0, -50, 0] : 0,
                  // scale: isActive ? 1.2 : 1,
                  // rotate: isAnimate ? 360 : 0,
                  boxShadow: isActive ? '0 6px 15px rgba(24,36,92,0.5)' : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'w-[45px] h-[45px] mx-auto rounded-[12px] flex items-center justify-center border relative z-20 transition-all duration-200 ease-in-out',
                  isCompleted
                    ? 'bg-primary border-primary text-white'
                    : isActive
                      ? 'bg-primary border-primary text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-500'
                )}>
                {isCompleted || (isActive && isLast) ? (
                  <CircleCheck fill='white' className='text-primary' />
                ) : (
                  <step.icon size={20} />
                )}
              </motion.div>
            </div>
            {/* Label */}
            <div className='mt-2 text-center'>
              <div className='text-xs text-gray-400'>Step {step.id}</div>
              <div
                className={cn(
                  'text-[11pt] font-medium',
                  isActive ? 'text-black' : 'text-gray-700'
                )}>
                {step.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
