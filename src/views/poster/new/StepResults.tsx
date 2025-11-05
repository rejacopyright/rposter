import { useState } from 'react'
import { useSearch } from '@tanstack/react-router'

import { getJobResult } from '@api/poster'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { tabResultValue } from '@lib/constants'
import { takeLast } from '@lib/fn'
import type { TabResultProps, WizardStepProps } from '@ts/poster'

export const StepResults = (_props: WizardStepProps) => {
  const search: any = useSearch({ from: '/poster/new' })

  const [tabValue, setTabValue] = useState<TabResultProps['value']>('list')
  const [variantId, setVariantId] = useState<string>('variant_1')

  const { data: { results } = { results: {} } } = getJobResult(search?.id)
  const designs = takeLast(results?.designs || [], 3)

  return (
    <div className='md:w-3/4 xl:w-2/3 mx-auto'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='font-medium'>Design Variants</div>
        <div className='flex items-center gap-x-3'>
          {tabValue === 'list' && (
            <Tabs value={variantId}>
              <TabsList>
                {designs.map(({ _id }, index: number) => (
                  <TabsTrigger
                    key={_id}
                    value={`variant_${index + 1}`}
                    onClick={() => setVariantId(`variant_${index + 1}`)}>
                    Variant {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          <Tabs value={tabValue}>
            <TabsList>
              {tabResultValue.map(({ value, icon: LucidIcon }) => (
                <TabsTrigger key={value} value={value} onClick={() => setTabValue(value)}>
                  <LucidIcon />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Tabs value={tabValue} className='mt-3 mb-5'>
        {tabResultValue.map(({ value, content: Content }) => {
          return (
            <TabsContent key={value} value={value}>
              <Content data={results} variantId={variantId} />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
