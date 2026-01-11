
import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/home/sidebar-nav-bar/sidebar-nav";
import { DashboardHeader } from "@/components/home/header/header";
import { Footer } from "@/components/Footer/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider collapsible={false}>
      <SidebarNav />
      <SidebarInset className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
    
  );
}
