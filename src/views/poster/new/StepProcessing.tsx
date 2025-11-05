import { useEffect, useState } from 'react'

import { getPosterPresets } from '@api/poster'
import { ActionButton } from '@components/custom/button'
import { ImagePreview } from '@components/custom/viewer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { usePosterForm } from '@hooks/usePosterForm'
import { snakeToCamel } from '@lib/fn'
import { cn } from '@lib/utils'
import type { WizardStepProps } from '@ts/wizardStep'
import { motion } from 'framer-motion'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import startCase from 'lodash/startCase'
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Blend,
  CircleCheck,
  CodeXml,
  Expand,
  GalleryHorizontalEnd,
  Loader2,
  Spotlight,
  TextCursorInput,
  Wand,
} from 'lucide-react'
import { useWatch } from 'react-hook-form'

const steps = [
  {
    id: 'transcription',
    icon: AudioLines,
    title: 'Transcribing Audio',
    desc: 'Converting speech to text using AI',
  },
  {
    id: 'copy_generation',
    icon: TextCursorInput,
    title: 'Generating Copy',
    desc: 'Creating marketing content in multiple languages',
  },
  {
    id: 'studio_transform',
    icon: Spotlight,
    title: 'Studio Transformation',
    desc: 'Applying professional photography effects',
  },
  {
    id: 'canvas_expand',
    icon: Expand,
    title: 'Canvas Expansion',
    desc: 'Intelligently expanding image canvas',
  },
  {
    id: 'image_blend',
    icon: Blend,
    title: 'Image Blending',
    desc: 'Merging elements for cohesive design',
  },
  {
    id: 'upscale',
    icon: Wand,
    title: '4K Upscaling',
    desc: 'Enhancing resolution to 4K quality',
  },
  {
    id: 'design_generation',
    icon: CodeXml,
    title: 'Generating Designs',
    desc: 'Creating multiple design variations',
  },
  {
    id: 'html_to_image',
    icon: GalleryHorizontalEnd,
    title: 'Converting to Images',
    desc: 'Converting HTML designs to high-quality images',
  },
]

export const StepProcessing = (props?: WizardStepProps) => {
  const { onNext, onPrev } = props || {}
  const { control } = usePosterForm()
  const { orientation, size, backgroundColor, image: imageFile } = useWatch({ control })

  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (currentStep < steps.length) {
      const t = setTimeout(() => setCurrentStep((prev) => prev + 1), 2000)
      return () => clearTimeout(t)
    } else {
      setCompleted(true)
    }
  }, [currentStep])

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     'https://ai-poster-api-staging.hi-lab.ai/api/jobs/6543f7a8b9c1d2e3f4a5b6c7/process'
  //   )

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     switch (data.type) {
  //       case 'step_start': {
  //         const index = steps.findIndex((s) => s.id === data.step)
  //         if (index !== -1) setCurrentStep(index)
  //         break
  //       }
  //       case 'step_complete': {
  //         setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  //         break
  //       }
  //       case 'pipeline_complete': {
  //         setCompleted(true)
  //         eventSource.close()
  //         break
  //       }
  //       case 'pipeline_error': {
  //         console.error('Pipeline failed:', data.error)
  //         eventSource.close()
  //         break
  //       }
  //     }
  //   }

  //   eventSource.onerror = (err) => {
  //     console.error('SSE connection error:', err)
  //     eventSource.close()
  //   }

  //   return () => eventSource.close()
  // }, [])

  const progressPercent = Math.min((currentStep / steps.length) * 100, 100)
  const thisStep = steps[currentStep] || steps[steps.length - 1]
  const progressLabel = completed
    ? 'Multiple design variants already generated for you to review...'
    : `${thisStep.desc}...`

  const posterPresetsQuery = getPosterPresets()
  const posterPresets = posterPresetsQuery.data
  // GET SIZE
  const sizeData = posterPresets?.sizes || {}
  const grouped = groupBy(sizeData, 'orientation')
  const formattedSizes: object | undefined = mapValues(grouped, (items) =>
    items.map((item) => ({
      value: item?.key,
      label: `${startCase(item?.type)} (${item?.dimensions?.width} x ${item?.dimensions?.height})`,
      dimensions: item?.dimensions,
    }))
  )
  const sizes = formattedSizes[orientation || 0] || []
  const dimension = sizes?.find(({ value }) => value === size)?.dimensions
  const ratio: number = parseFloat(((dimension?.width || 1) / (dimension?.height || 1)).toFixed(1))

  return (
    <>
      <div className='md:w-3/4 xl:w-2/3 mx-auto'>
        <div className='flex flex-wrap gap-6 pt-4 w-full'>
          {/* Left form */}
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
                                    ? 'bg-gray-100 text-primary border-gray-200'
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

          {/* Right Preview */}
          <div className='flex-1 h-min bg-gray-50 rounded-lg p-4 sticky top-5'>
            <div className='font-semibold mb-1'>Preview</div>
            <div
              className={cn(
                'p-4 bg-white rounded-xl shadow-lg my-10 md:w-4/5 xl:w-3/4 mx-auto overflow-hidden',
                `aspect-[${ratio}]`
              )}
              style={{ backgroundColor: snakeToCamel(backgroundColor) }}>
              <div className='w-1/2'>
                <div className='mt-2 aspect-square'>
                  <ImagePreview file={imageFile} fill='cover' />
                </div>
              </div>
            </div>
            <div className=''>
              <div className='font-semibold text-sm'>Audio Transcription</div>
              <div className='text-xs'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
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
          <ActionButton onClick={onNext}>
            <span className='mr-2'>Generate</span>
            <ArrowRight size={20} />
          </ActionButton>
        </div>
      </div>
    </>
  )
}
