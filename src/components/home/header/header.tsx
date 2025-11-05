"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationButton } from "./notification-button/notification-button";
import { UserMenu } from "./user-menu/user-menu";
import styles from "./header.module.css";

export function DashboardHeader() {
  return (
    <header
      className={styles.header}
      style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text-color)' }}
    >
      <SidebarTrigger className={styles.sidebarTrigger} />
      <div className={styles.flexSpacer} />
      <NotificationButton />
      <UserMenu />
    </header>
  );
}
