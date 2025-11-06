import { useState } from 'react'
import { useParams } from '@tanstack/react-router'

import { getJobDetail } from '@api/poster'
import { Button } from '@components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { tabResultValue } from '@lib/constants'
import { randomString, takeLast } from '@lib/fn'
import type { TabResultProps } from '@ts/poster'
import { ArrowLeft } from 'lucide-react'

export const PosterDetail = () => {
  const { id = '' } = useParams({ strict: false })

  const [tabValue, setTabValue] = useState<TabResultProps['value']>('list')
  const [variantId, setVariantId] = useState<string>('variant_1')

  const { data: { job } = { job: {} } } = getJobDetail(id)
  const designs = takeLast(job?.designs || [], 3)

  return (
    <div className='md:w-3/4 xl:w-2/3 mx-auto'>
      <div className='sticky top-0 pt-4 pb-2 bg-white'>
        <Button
          variant='ghost'
          asChild
          className='mb-2 hover:px-3!'
          style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className='cursor-pointer' onClick={() => history.back()}>
            <ArrowLeft />
            <div className=''>Back</div>
          </div>
        </Button>
        <div className='flex items-center justify-between'>
          <div className=''>
            <div className='font-medium'>Where Elegance Meets Design Excellence.</div>
            <div className='text-sm text-gray-500'>Created today, 09:01 AM</div>
          </div>
          <div className='flex items-center gap-x-3'>
            {tabValue === 'list' && (
              <Tabs value={variantId}>
                <TabsList>
                  {designs.map((_, index: number) => (
                    <TabsTrigger
                      key={randomString()}
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
                  <TabsTrigger
                    key={randomString()}
                    value={value}
                    onClick={() => setTabValue(value)}>
                    <LucidIcon />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <Tabs value={tabValue} className='mt-3 mb-5'>
        {tabResultValue.map(({ value, content: Content }) => {
          return (
            <TabsContent key={randomString()} value={value}>
              <Content data={job} variantId={variantId} />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
