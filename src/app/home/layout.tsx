
import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/home/sidebar-nav-bar/sidebar-nav";
import { DashboardHeader } from "@/components/home/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider collapsible={false}>
      <SidebarNav />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
