import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import axios from '@lib/axios'
import type { JobParamProps } from '@ts/poster'

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

export const getJobStatus = (id: string) => {
  return useQuery({
    queryKey: ['getJobStatus'],
    queryFn: () => axios.get(`jobs/${id}/processing-status`),
    select: ({ data }) => data || {},
    refetchInterval: 5000,
    enabled: !!id,
  })
}

export const getJobResult = (id: string) => {
  return useQuery({
    queryKey: ['getJobResult'],
    queryFn: () => axios.get(`jobs/${id}/results`),
    select: ({ data }) => data || {},
    enabled: !!id,
  })
}

export const createJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => axios.post('jobs/create'),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['getJobs'], exact: false })
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
    },
  })
}
