import { createContext, useContext } from 'react'

import { useForm, type UseFormReturn } from 'react-hook-form'

type PaddingRatio = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
type JSONString = string & { key: 'value' }

export type FormValues = {
  image?: File
  audio?: File
  language?: 'en' | 'ar' | string
  orientation?: 'horizontal' | 'vertical' | 'square'
  size?: string
  productPosition?: 'left' | 'right' | 'top' | 'bottomm' | 'center'
  backgroundColor?: string
  customWidth?: number
  customHeight?: number
  minimalPadding?: boolean
  paddingRatio?: PaddingRatio
  useCase?: string
  assetConfig?: JSONString
}

const defaultValues: FormValues = {
  image: undefined,
  audio: undefined,
  language: 'en',
  orientation: 'vertical',
  size: 'vertical_standard',
  productPosition: 'center',
  backgroundColor: 'white',
  customWidth: undefined,
  customHeight: undefined,
  minimalPadding: true,
  paddingRatio: 0.3,
  useCase: 'instagram_story',
  assetConfig: undefined,
}

const FormContext = createContext<UseFormReturn<FormValues> | null>(null)

export const PosterFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormValues>({ defaultValues, mode: 'onChange' })

  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>
}

export const usePosterForm = () => {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('usePosterForm must be used within PosterFormProvider')
  return ctx
}
