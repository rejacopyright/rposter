import { useSearch } from '@tanstack/react-router'

import { getJobs } from '@api/poster'
import { InputDebounce } from '@components/custom/InputDebounce'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useQueryState } from '@hooks/useQueryState'
import { tabGallery } from '@lib/constants'
import { randomString } from '@lib/fn'
import type { TabGalleryProps } from '@ts/gallery'

export const GalleryPage = () => {
  const { view, category: cat, keyword: q }: any = useSearch({ strict: false })

  const [viewMode, setViewMode] = useQueryState<TabGalleryProps['value']>('view', view || 'list')
  const [category, setCategory] = useQueryState<string>('category', cat || 'all')
  const [keyword, setKeyword] = useQueryState<string>('keyword', q || '')

  const { data = [] } = getJobs({ limit: 20, status: 'completed', viewMode, category, keyword })

  return (
    <div className='lg:px-10'>
      <div className='sticky top-0 pt-5 pb-2 bg-white z-10'>
        <div className='mb-4'>
          <div className='font-medium'>Gallery</div>
          <div className='text-sm text-gray-500'>Browse your AI-generated poster collection</div>
        </div>
        <div className='flex items-center justify-between'>
          <Tabs value={category}>
            <TabsList>
              <TabsTrigger value='all' onClick={() => setCategory('all')}>
                All
              </TabsTrigger>
              <TabsTrigger value='favorites' onClick={() => setCategory('favorites')}>
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className='flex gap-3'>
            <InputDebounce controlled defaultValue={keyword} onChange={setKeyword} />
            <Tabs value={viewMode}>
              <TabsList>
                {tabGallery.map(({ value, icon: LucidIcon }) => (
                  <TabsTrigger key={value} value={value} onClick={() => setViewMode(value)}>
                    <LucidIcon />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <Tabs value={viewMode} className='mt-3 mb-5'>
        {tabGallery.map(({ value, content: Content }) => (
          <TabsContent key={value} value={value}>
            <Content data={allJobs} category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
