
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import styles from "./header.module.css";
import { NotificationButton } from "./notification-button/notification-button";
import { UserMenu } from "./user-menu/user-menu";

export function DashboardHeader() {
  return (
    <header className={styles.header}>
      <SidebarTrigger className={styles.sidebarTrigger} />
      <div className={styles.flexSpacer} />
      <NotificationButton />
      <UserMenu />
    </header>
  );
}
