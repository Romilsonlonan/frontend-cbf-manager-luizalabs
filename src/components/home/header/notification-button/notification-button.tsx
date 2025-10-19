
"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./notification-button.module.css";

export function NotificationButton() {
  return (
    <Button variant="ghost" size="icon" className={styles.notificationButton}>
      <Bell className={styles.notificationIcon} />
      <span className={styles.srOnly}>Toggle notifications</span>
    </Button>
  );
}
