import qs from 'qs'

interface LocationProps extends Partial<Location> {
  url?: string
  urlBtoa?: string
  params?: any
}

function useLocation() {
  const getLocation: LocationProps = typeof window !== 'undefined' ? window.location : {}

  const fullPathWithoutOrigin = getLocation.href?.replace(getLocation.origin?.toString() || '', '')

  getLocation.params = qs.parse(getLocation.search?.toString() || '', {
    ignoreQueryPrefix: true,
  })
  getLocation.url = fullPathWithoutOrigin
  getLocation.urlBtoa = btoa(fullPathWithoutOrigin || '/')

  return getLocation
}

export default useLocation
