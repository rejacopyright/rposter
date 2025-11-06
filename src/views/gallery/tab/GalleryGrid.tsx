import { GalleryCardGrid } from '@components/custom/cardImage'
import { randomString } from '@lib/fn'

export const GalleryGrid = ({ data }) => {
  return (
    <div className='grid auto-rows-min gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {data?.map((item) => {
        return <GalleryCardGrid data={item} key={randomString()} />
      })}
    </div>
  )
}
