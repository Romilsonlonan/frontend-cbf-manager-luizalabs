
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
  ShieldCheck,
  LayoutGrid,
  KeyRound,
  ExternalLink,
  UsersRound,
  Database,
  Container,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Backend Buddy</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard"}
              tooltip="Dashboard"
            >
              <Link href="/dashboard">
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/dashboard/credentials")}
              tooltip="Credentials"
            >
              <Link href="/dashboard/credentials">
                <KeyRound />
                <span>Credentials</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="my-4" />

        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Authentication">
                    <Link href="#">
                        <UsersRound/>
                        <span>Authentication</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Firestore">
                    <Link href="#">
                        <Database/>
                        <span>Firestore</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Storage">
                    <Link href="#">
                        <Container/>
                        <span>Storage</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Firebase Studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a href="https://studio.firebase.google.com/backend-95170514">
                <ExternalLink />
                <span>Firebase Studio</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
