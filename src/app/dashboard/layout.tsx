
import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <DashboardHeader />
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
