import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

export type TabContentProps = { data: any; category?: string }

export type TabGalleryProps = {
  value: 'list' | 'grid'
  icon: ComponentType<LucideProps>
  content: ComponentType<TabContentProps>
}
