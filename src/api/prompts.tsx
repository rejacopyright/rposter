import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import axios from '@lib/axios'
import type { PromptParamProps } from '@ts/prompts'

export const getPrompts = (params?: PromptParamProps) => {
  return useQuery({
    queryKey: ['getPrompts', { ...(params || {}) }],
    queryFn: () => axios.get('prompts', { params }),
    select: ({ data }) => data?.prompts || [],
  })
}

export const getDetailPrompt = (id?: string) => {
  return useQuery({
    queryKey: ['getDetailPrompt', { id }],
    queryFn: () => axios.get(`prompts/${id}`),
    select: ({ data }) => data?.prompt || {},
    enabled: Boolean(id),
  })
}

export const updatePrompt = (id: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => axios.put(`prompts/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['getPrompts'], exact: false })
    },
  })
}
