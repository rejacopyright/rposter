import { useSearch } from '@tanstack/react-router'

import { CardImage } from '@components/custom/cardImage'
import { randomString, takeLast } from '@lib/fn'

export const TabGrid = ({ data }) => {
  const designs = takeLast(data?.designs || [], 3)
  const { id = '' }: any = useSearch({ strict: false })
  return (
    <div className='flex gap-4'>
      {designs.map(({ imageUrl, format, variantNumber }) => {
        return (
          <div key={randomString()} className='flex-1'>
            <CardImage grid url={imageUrl} ext={format} variant={variantNumber} id={id} />
          </div>
        )
      })}
    </div>
  )
}
