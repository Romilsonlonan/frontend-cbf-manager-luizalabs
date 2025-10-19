
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
} from "@/components/ui/sidebar";
import {
  Shield,
  LayoutGrid,
  UsersRound,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
              <Image
                  src="https://i.ibb.co/WWx6qgWF/cbf.png"
                  width={40}
                  height={40}
                  alt="CBF Logo"
                  className="shrink-0 rounded-full"
              />
              <h1 className="text-xl font-bold text-foreground truncate">CBF Manager</h1>
          </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
          <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard"}
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
