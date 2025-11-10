import { useParams, useSearch } from '@tanstack/react-router'

import { CardImage } from '@components/custom/cardImage'
import { takeLast } from '@lib/fn'

export const TabGrid = ({ data }) => {
  const designs = takeLast(data?.designs || [], 3)
  let id = ''
  const params = useParams({ strict: false })
  if (params.id) id = params.id || ''
  else id = (useSearch({ strict: false }) as any).id
  return (
    <div className='flex gap-4'>
      {designs.map(({ _id, imageUrl, format, variantNumber }) => {
        return (
          <div key={_id} className='flex-1'>
            <CardImage grid url={imageUrl} ext={format} variant={variantNumber} id={id} />
          </div>
        )
      })}
    </div>
  )
}
