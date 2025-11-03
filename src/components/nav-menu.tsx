'use client'

import { Link } from '@tanstack/react-router'

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
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url} className='h-9'>
                <item.icon />
                <span className=''>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
