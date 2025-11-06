import { useSearch } from '@tanstack/react-router'

import { CardImage } from '@components/custom/cardImage'
import { HTMLViewer } from '@components/custom/htmlViewer'
import { Tabs, TabsContent } from '@components/ui/tabs'
import { randomString, takeLast } from '@lib/fn'

export const TabList = ({ data, variantId }) => {
  const designs = takeLast(data?.designs || [], 3)
  const { id = '' }: any = useSearch({ strict: false })
  return (
    <Tabs value={variantId} className='mt-3'>
      {designs.map(({ imageUrl, format, html, variantNumber }, index: number) => {
        return (
          <TabsContent key={randomString()} value={`variant_${index + 1}`}>
            {/* IMAGE VIEWER */}
            <CardImage url={imageUrl} ext={format} variant={variantNumber} id={id} />
            {/* COODE VIEWER */}
            <HTMLViewer html={html} />
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
