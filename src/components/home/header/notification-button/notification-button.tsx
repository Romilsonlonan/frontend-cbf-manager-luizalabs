"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./notification-button.module.css";

export function NotificationButton() {
  return (
    <Button variant="ghost" size="icon" className={styles.notificationButton}>
      <Bell className={styles.icon} />
      <span className="sr-only">Toggle notifications</span>
    </Button>
  );
}
