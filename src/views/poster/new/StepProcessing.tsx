import { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'

import { getJobStatus } from '@api/poster'
import { ActionButton } from '@components/custom/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { usePosterForm } from '@hooks/usePosterForm'
import { API_SERVER } from '@lib/axios'
import { steps } from '@lib/constants'
import { snakeToCamel, takeLast } from '@lib/fn'
import { cn } from '@lib/utils'
import type { WizardStepProps } from '@ts/poster'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CircleCheck, Loader2 } from 'lucide-react'
import { useWatch } from 'react-hook-form'
import { toast } from 'sonner'

export const StepProcessing = (props?: WizardStepProps) => {
  const search: any = useSearch({ from: '/poster/new' })
  const { onNext, onPrev } = props || {}
  const { control } = usePosterForm()
  const { backgroundColor } = useWatch({ control })

  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const { data } = getJobStatus(search?.id)

  // useEffect(() => {
  //   if (currentStep < steps.length) {
  //     const t = setTimeout(() => setCurrentStep((prev) => prev + 1), 2000)
  //     return () => clearTimeout(t)
  //   } else {
  //     setCompleted(true)
  //   }
  // }, [currentStep])

  useEffect(() => {
    if (!search?.id || !data?.status) return
    if (data?.status === 'failed') toast.error('Failed to connect to SSE stream')
    if (data?.status !== 'completed') {
      setCurrentStep(data?.progress?.completed || 1)
      setCompleted(false)
    } else {
      setCurrentStep((data?.progress?.completed || 1) + 1)
      setCompleted(true)
    }
    if (!['created', 'processing', 'completed'].includes(data?.status)) {
      const eventSource = new EventSource(`${API_SERVER}/api/jobs/${search.id}/process`)
      eventSource.onopen = () => toast.success('Connected to SSE stream')
      eventSource.onmessage = (event) => {
        const dt = JSON.parse(event.data)
        switch (dt.type) {
          case 'step_start': {
            const index = steps.findIndex((s) => s.id === dt.step)
            if (index !== -1) setCurrentStep(index)
            break
          }
          case 'step_complete': {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
            break
          }
          case 'pipeline_complete': {
            setCompleted(true)
            eventSource.close()
            break
          }
          case 'pipeline_error': {
            toast.error('Pipeline failed')
            eventSource.close()
            break
          }
        }
      }

      eventSource.onerror = () => {
        toast.error('SSE connection error')
        eventSource.close()
      }

      return () => eventSource.close()
    }
  }, [currentStep, data, search.id])

  const progressPercent = Math.min((currentStep / steps.length) * 100, 100)
  const thisStep = steps[currentStep] || steps[steps.length - 1]
  const progressLabel = completed
    ? 'Multiple design variants already generated for you to review...'
    : `${thisStep.desc}...`

  const last3 = takeLast(data?.partialResults?.designs, 3)
  const transcription = data?.partialResults?.transcription

  return (
    <>
      <div className='md:w-3/4 xl:w-2/3 mx-auto'>
        <div className='flex flex-wrap gap-6 pt-4 w-full'>
          {/* Left Side */}
          <div className='w-1/2 space-y-2 border rounded-xl h-min'>
            <div className='px-5 pt-5 h-[85px]'>
              <p className='text-lg font-semibold text-gray-900'>
                {Math.round(progressPercent)}% Completed
              </p>
              <p className='text-sm text-gray-500'>{progressLabel}</p>
            </div>
            {/* Progress Bar */}
            <div className='relative px-5'>
              <div className='flex gap-1 mt-2 mb-1 relative overflow-hidden'>
                {Array.from({ length: 40 }).map((_, i) => {
                  const filled = i < Math.round((progressPercent / 100) * 40)
                  return (
                    <div
                      key={i}
                      className={cn(
                        'h-12 flex-1 rounded-sm transition-all duration-1000',
                        filled ? 'bg-primary relative z-10' : 'bg-gray-200'
                      )}></div>
                  )
                })}
                {progressPercent < 100 && <div className='absolute inset-0 shimmer z-0' />}
              </div>
              <p className='text-sm text-gray-500 text-end'>{`${currentStep} out of ${steps.length} steps`}</p>
            </div>
            {/* Pipeline Steps */}
            <Accordion type='single' collapsible className='w-full pb-5' defaultValue='item-1'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-md px-5 pb-0'>
                  Processing Pipeline
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4 text-balance py-0'>
                  <div className='px-5 pt-5'>
                    <div className='relative space-y-4'>
                      {steps.map((step, i) => {
                        const Icon = step.icon
                        const isCompleted = i < currentStep
                        const isActive = i === currentStep
                        const isLast = i === steps.length - 1
                        const isAnimate = isCompleted && currentStep - i

                        return (
                          <div key={step.id} className='flex items-start gap-3 relative'>
                            {/* Vertical line */}
                            {!isLast && (
                              <div
                                className={cn(
                                  'absolute left-[18px] top-6 w-1 h-[calc(100%+12px)] z-0',
                                  isCompleted ? 'bg-primary' : 'bg-gray-200'
                                )}
                              />
                            )}
                            {isActive && !isLast && (
                              <div className='absolute left-[18px] top-5 w-1 h-[calc(50%+8px)] z-0 bg-primary' />
                            )}

                            {/* Step icon */}
                            <motion.div
                              animate={{
                                y: isAnimate ? [0, -75, 0] : 0,
                                // scale: isActive ? 1.2 : 1,
                                rotate: isAnimate ? 360 : 0,
                              }}
                              transition={{ duration: 0.25 }}
                              className={cn(
                                'flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-300 relative z-10',
                                isCompleted
                                  ? 'bg-primary text-white border-primary'
                                  : isActive
                                    ? 'bg-primary-radial text-primary'
                                    : 'bg-gray-100 text-gray-500 border-gray-100'
                              )}>
                              {isCompleted ? (
                                <CircleCheck
                                  // strokeWidth={3}
                                  fill='white'
                                  className='text-primary'
                                />
                              ) : isActive ? (
                                <Loader2 size={20} className='animate-spin' />
                              ) : (
                                <Icon size={20} />
                              )}
                            </motion.div>

                            {/* Step content */}
                            <div>
                              <p
                                className={cn(
                                  'font-medium text-sm',
                                  isCompleted
                                    ? 'text-gray-900'
                                    : isActive
                                      ? 'text-gray-900'
                                      : 'text-gray-700'
                                )}>
                                {step.title}
                              </p>
                              <p className='text-xs text-gray-500'>{step.desc}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Side */}
          <div className='flex-1 h-min bg-gray-50 rounded-lg p-4 sticky top-5'>
            <div className='font-semibold mb-1'>Preview</div>
            {last3.length > 0 && last3[0]?.imageUrl ? (
              <Tabs defaultValue='variant_1' className='mt-3 mb-5'>
                <TabsList>
                  {last3.map((_, index: number) => (
                    <TabsTrigger key={index} value={`variant_${index + 1}`}>
                      Variant {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {last3.map((item: any, index: number) => {
                  return (
                    <TabsContent key={index} value={`variant_${index + 1}`}>
                      <div
                        className={cn(
                          'bg-white rounded-xl shadow-lg my-5 md:w-4/5 xl:w-3/4 mx-auto overflow-hidden'
                        )}
                        style={{ backgroundColor: snakeToCamel(backgroundColor) }}>
                        <img src={item?.imageUrl} alt='' className='w-full' />
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            ) : (
              <div
                className={cn(
                  'p-4 bg-gray-100 rounded-xl shadow-lg my-10 md:w-4/5 xl:w-3/4 mx-auto relative overflow-hidden',
                  `aspect-square`
                )}>
                <div className='absolute inset-0 shimmer z-0' />
              </div>
            )}
            <div className=''>
              <div className='font-semibold text-sm'>Audio Transcription</div>
              <div className='text-xs'>{transcription || 'transcribing'}...</div>
            </div>
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 lg:w-11/12 mx-auto bg-white p-5 rounded-t-xl mt-10 z-10'>
        <div className='flex items-center justify-between'>
          <Button variant='outline' onClick={onPrev}>
            <ArrowLeft size={20} />
            <span>Previous</span>
          </Button>
          <ActionButton onClick={onNext} disabled={data?.status !== 'completed'}>
            <span className='mr-2'>Generate</span>
            <ArrowRight size={20} />
          </ActionButton>
        </div>
      </div>
    </>
  )
}
