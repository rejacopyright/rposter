export interface SearchboxProps {
  onChange?: (e: string | undefined) => void
  isBouncing?: (e: boolean) => void
  defaultValue?: string
  delay?: number
  className?: string
  placeholder?: any
  controlled?: boolean
  bounceOnEmpty?: boolean
}
