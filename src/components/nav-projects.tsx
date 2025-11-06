'use client'

import { Link, useLocation } from '@tanstack/react-router'

import { getJobs } from '@api/poster'
import { cn } from '@lib/utils'
import { MoreHorizontal, PencilLine } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavProjects() {
  const location = useLocation() // dapatkan URL saat ini

  const { data = [] } = getJobs({ limit: 10, status: 'completed' })

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel className='pb-4'>GENERATED POSTER</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to='/poster/new' className='h-9 cursor-pointer flex items-center gap-2'>
              <PencilLine />
              <span>Create new poster</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div
              className={cn('h-9 cursor-pointer flex items-center gap-2', {
                'bg-gray-200/50': location.pathname === '/poster/new',
                hidden: location.pathname !== '/poster/new',
              })}>
              <span>Untitled</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {data.map((item) => {
          const id: string = item?.id || ''
          const isActive = location.pathname.startsWith(`/poster/${id}/detail`)
          return (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton asChild>
                <Link
                  to={`/poster/$id/detail`}
                  params={{ id }}
                  className={cn('h-9 cursor-pointer flex items-center gap-2', {
                    'bg-gray-200/50': isActive,
                  })}>
                  <span>{item?.transcription || 'Untitled'}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to='/gallery' className='h-9 cursor-pointer flex items-center gap-2'>
              <MoreHorizontal />
              <span>More Designs</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
