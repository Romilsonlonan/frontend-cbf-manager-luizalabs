
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
      <SidebarInset className="flex flex-col min-h-screen w-full dashboard-layout">
        <DashboardHeader />
        <main className="flex-1 w-full flex flex-col items-center overflow-x-hidden">
          <div className="w-full max-w-none p-4 md:p-8">
            {children}
          </div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
    
  );
}
