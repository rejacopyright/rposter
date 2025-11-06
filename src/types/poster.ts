import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

export interface WizardStepProps {
  onNext?: (params?: { [key: string]: any }) => void
  onPrev?: () => void
  step?: number
}

type PaddingRatio = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
export type JSONString = string & { [key: string]: any }

export type PosterFormProps = {
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

export type TabContentProps = { data: any; variantId?: string }

export type TabResultProps = {
  value: 'list' | 'grid' | 'code'
  icon: ComponentType<LucideProps>
  content: ComponentType<TabContentProps>
}

export type JobParamProps = {
  page?: number
  limit?: number
  status?: 'created' | 'uploaded' | 'processing' | 'completed' | 'failed'
  includeDesigns?: boolean
  [key: string]: any
}
