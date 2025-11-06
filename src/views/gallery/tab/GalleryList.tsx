import { GalleryCardList } from '@components/custom/cardImage'
import { randomString } from '@lib/fn'

export const GalleryList = ({ data }) => {
  return (
    <div className='divide-y divide-gray-200'>
      {data?.map((item) => {
        return <GalleryCardList data={item} key={randomString()} />
      })}
    </div>
  )
}
