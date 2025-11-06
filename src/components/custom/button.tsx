import { cn } from '@lib/utils'
import type { ReactNode } from 'react'

interface ActionButtonProps {
  onClick?: () => void
  children?: ReactNode
  disabled?: boolean
  isLoading?: boolean
  className?: string
}

export function ActionButton({
  onClick,
  children = 'Button',
  disabled = false,
  isLoading = false,
  className = '',
}: ActionButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn('btn-action bg-primary-radial', className, {
        'opacity-50': disabled || isLoading,
      })}>
      {isLoading ? 'Waiting...' : children}
    </button>
  )
}
