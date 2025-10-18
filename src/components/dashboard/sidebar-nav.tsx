
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Shield,
  LayoutGrid,
  UsersRound,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/WWx6qgWF/cbf.png"
            width={32}
            height={32}
            alt="CBF Logo"
            className="rounded-full"
          />
          <h1 className="text-xl font-bold text-foreground">CBF Manager</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard"}
              tooltip="Painel"
            >
              <Link href="/dashboard">
                <LayoutGrid />
                <span>Painel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/dashboard/athletes")}
              tooltip="Atletas"
            >
              <Link href="/dashboard/athletes">
                <UsersRound />
                <span>Atletas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/dashboard/clubs")}
              tooltip="Clubes"
            >
              <Link href="/dashboard/clubs">
                <Shield />
                <span>Clubes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
