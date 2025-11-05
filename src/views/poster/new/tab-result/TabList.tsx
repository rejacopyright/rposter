import { CardImage } from '@components/custom/cardImage'
import { HTMLViewer } from '@components/custom/htmlViewer'
import { Tabs, TabsContent } from '@components/ui/tabs'
import { takeLast } from '@lib/fn'

export const TabList = ({ data, variantId }) => {
  const designs = takeLast(data?.designs || [], 3)
  return (
    <Tabs value={variantId} className='mt-3'>
      {designs.map(({ imageUrl, format, html }, index: number) => {
        return (
          <TabsContent key={imageUrl} value={`variant_${index + 1}`}>
            {/* IMAGE VIEWER */}
            <CardImage url={imageUrl} ext={format} />
            {/* COODE VIEWER */}
            <HTMLViewer html={html} />
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
