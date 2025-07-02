"use client"

import type * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconFileDescription,
  IconInnerShadowTop,
  IconSettings,
  IconHelp,
  IconSearch,
  IconCoin,
  IconTrendingUp,
} from "@tabler/icons-react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Juan Pérez",
    email: "juan@investor.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Bonos",
      url: "/bonos",
      icon: IconCoin,
    },
<<<<<<< Updated upstream
=======
    ...(isInversor
        ? [
          {
            title: "Mis Inversiones",
            url: "/inversiones",
            icon: IconTrendingUp,
          },
        ]
        : []),
    ...(isEmisor
        ? [
          {
            title: "Mis Bonos",
            url: "/mis-bonos",
            icon: IconFileDescription,
          },
          {
            title: "Crear Bono",
            url: "/crear-bono",
            icon: IconFileDescription,
          },
        ]
        : []),
>>>>>>> Stashed changes
    {
      title: "Tabla Amortización",
      url: "/table",
      icon: IconChartBar,
    },
<<<<<<< Updated upstream
    {
      title: "Reportes",
      url: "/reportes",
      icon: IconFileDescription,
    },
    {
      title: "Rendimiento",
      url: "/rendimiento",
      icon: IconTrendingUp,
    },
  ],
  navSecondary: [
=======
  ]

  const navSecondaryItems = [
>>>>>>> Stashed changes
    {
      title: "Configuración",
      url: "/configuracion",
      icon: IconSettings,
    },
    {
      title: "Ayuda",
      url: "/ayuda",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "/buscar",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <Link href="/dashboard">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">FinanzApp</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
  )
}
