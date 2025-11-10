import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import axios from '@lib/axios'
import type { JobParamProps } from '@ts/poster'
import flatMap from 'lodash/flatMap'
import omit from 'lodash/omit'

export const getPosterPresets = () => {
  return useQuery({
    queryKey: ['getPosterPresets'],
    queryFn: () => axios.get('poster-presets'),
    select: ({ data }) => data?.presets || {},
  })
}

export const getJobs = (params?: JobParamProps) => {
  return useQuery({
    queryKey: ['getJobs', { ...(params || {}) }],
    queryFn: () => axios.get('jobs', { params }),
    select: ({ data }) => data?.data || [],
  })
}

export const getPaginatedJobs = (params?: JobParamProps) => {
  return useInfiniteQuery({
    queryKey: ['paginatedJobs', omit(params || {}, ['page'])],
    queryFn: ({ pageParam = 1 }) => axios.get('jobs', { params: { ...params, page: pageParam } }),
    select: (res: any) => {
      const result = { ...res, pages: flatMap(res?.pages, 'data.data') }
      return result
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      const hasNext = lastPage?.data?.pagination?.hasNextPage
      if (hasNext) return lastPage.data.pagination.currentPage + 1
      return undefined
    },
  })
}

export const getJobStatus = (id: string) => {
  return useQuery({
    queryKey: ['getJobStatus', { id }],
    queryFn: () => axios.get(`jobs/${id}/processing-status`),
    select: ({ data }) => data || {},
    refetchInterval: 5000,
    enabled: !!id,
  })
}

export const getJobResult = (id: string) => {
  return useQuery({
    queryKey: ['getJobResult', { id }],
    queryFn: () => axios.get(`jobs/${id}/results`),
    select: ({ data }) => data || {},
    enabled: !!id,
  })
}

export const getJobDetail = (id: string) => {
  return useQuery({
    queryKey: ['getJobDetail', { id }],
    queryFn: () => axios.get(`jobs/${id}/status`),
    select: ({ data }) => data || {},
  })
}

export const createJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => axios.post('jobs/create'),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['getJobs'], exact: false })
      qc.invalidateQueries({ queryKey: ['paginatedJobs'], exact: false })
    },
  })
}

export const uploadJob = (id: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) =>
      axios.post(`jobs/${id}/upload`, data, {
        headers: { Accept: 'text/event-stream', 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['getJobs'], exact: false })
      qc.invalidateQueries({ queryKey: ['paginatedJobs'], exact: false })
    },
  })
}
