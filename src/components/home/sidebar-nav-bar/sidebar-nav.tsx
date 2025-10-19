
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Shield,
  LayoutGrid,
  UsersRound,
} from "lucide-react";
import { SidebarLogo } from "./sidebar-logo/sidebar-logo";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
          <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
          <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton
              asChild
              isActive={pathname === "/home"}
              >
              <Link href="/home">
                  <LayoutGrid />
                  <span>Painel</span>
              </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/home/athletes")}
              >
              <Link href="/home/athletes">
                  <UsersRound />
                  <span>Atletas</span>
              </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/home/clubs")}
              >
              <Link href="/home/clubs">
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
