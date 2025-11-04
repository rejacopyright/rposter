import { useQuery } from '@tanstack/react-query'

import axios from '@lib/axios'

export const getPosterPresets = () => {
  return useQuery({
    queryKey: ['getPosterPresets'],
    queryFn: () => axios.get('poster-presets'),
    select: ({ data }) => data?.presets || {},
  })
}
