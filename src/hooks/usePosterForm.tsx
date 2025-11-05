import { createContext, useContext } from 'react'

import type { PosterFormProps } from '@ts/poster'
import { useForm, type UseFormReturn } from 'react-hook-form'

const defaultValues: PosterFormProps = {
  image: undefined,
  audio: undefined,
  language: 'en',
  orientation: 'vertical',
  size: 'standard',
  productPosition: 'center',
  backgroundColor: 'white',
  customWidth: undefined,
  customHeight: undefined,
  minimalPadding: true,
  paddingRatio: 0.3,
  useCase: 'instagram_story',
  assetConfig: undefined,
}

const FormContext = createContext<UseFormReturn<PosterFormProps> | null>(null)

export const PosterFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<PosterFormProps>({ defaultValues, mode: 'onChange' })

  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>
}

export const usePosterForm = () => {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('usePosterForm must be used within PosterFormProvider')
  return ctx
}
