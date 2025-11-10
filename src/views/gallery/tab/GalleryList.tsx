import { GalleryCardList } from '@components/custom/cardImage'

export const GalleryList = ({ data }) => {
  return (
    <div className='divide-y divide-gray-200'>
      {data?.map((item) => {
        return <GalleryCardList data={item} key={item?.id} />
      })}
    </div>
  )
}
