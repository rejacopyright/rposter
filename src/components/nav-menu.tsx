'use client'

import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '@lib/utils'
import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavMenu({
  projects,
}: {
  projects: Array<{
    name: string
    url: string
    icon: LucideIcon
  }>
}) {
  const { pathname } = useLocation()
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu>
        {projects.map((item) => {
          const isHomePath = pathname === item.url && item.url === '/'
          const isMatchPath = pathname.startsWith(item.url) && item.url !== '/'
          const isActive = isMatchPath || isHomePath
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.url}
                  className={cn('h-9 cursor-pointer flex items-center gap-2', {
                    'bg-gray-200/50': isActive,
                  })}>
                  <item.icon />
                  <span className=''>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
