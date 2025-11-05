'use client'

import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '@lib/utils'
import { PencilLine } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type ItemProps = {
  id?: string
  name?: string
  url?: string
}

export function NavProjects() {
  const location = useLocation() // dapatkan URL saat ini

  const projects: Array<ItemProps> = [
    { id: '1', name: 'Lorem ipsum dolor sit amet', url: '/poster/123/detail' },
    { id: '2', name: 'Lorem ipsum dolor sit amet consectetur', url: '/poster/234/detail' },
  ]

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

        {projects.map((item) => {
          const isActive = location.pathname.startsWith(item.url || '')
          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.url || '#'}
                  className={cn('h-9 cursor-pointer flex items-center gap-2', {
                    'bg-gray-200/50': isActive,
                  })}>
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
