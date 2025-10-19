"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationButton } from "./notification-button/notification-button";
import { UserMenu } from "./user-menu/user-menu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1" />
      <NotificationButton />
      <UserMenu />
    </header>
  );
}
