import { CardImage } from '@components/custom/cardImage'
import { takeLast } from '@lib/fn'

export const TabGrid = ({ data }) => {
  const designs = takeLast(data?.designs || [], 3)
  return (
    <div className='flex gap-4'>
      {designs.map(({ imageUrl, format, variantNumber }, index: number) => {
        return (
          <div key={index} className='flex-1'>
            <CardImage grid url={imageUrl} ext={format} variant={variantNumber} />
          </div>
        )
      })}
    </div>
  )
}
