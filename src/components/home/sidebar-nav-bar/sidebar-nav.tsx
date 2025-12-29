
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
  BarChartHorizontal,
  Building2,
} from "lucide-react";
import { SidebarLogo } from "./sidebar-logo/sidebar-logo";
import styles from "./sidebar-nav.module.css";
// Removed useAuth and LogOut import as logout button is moved

export function SidebarNav() {
  const pathname = usePathname();
  // Removed logout from useAuth as logout button is moved

  return (
    <Sidebar className={styles.sidebar}>
      <SidebarHeader className={styles.sidebarHeader}>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className={styles.sidebarContent}>
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
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/home/statistics")}
            >
              <Link href="/home/statistics">
                <BarChartHorizontal />
                <span>Estatísticas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/home/training-centers")}
            >
              <Link href="/home/training-centers">
                <Building2 />
                <span>Gerenciar CT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* Logout button will be moved to DashboardHeader */}
      </SidebarFooter>
    </Sidebar>
  );
}
