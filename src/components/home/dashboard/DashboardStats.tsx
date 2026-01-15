"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, Shield, BarChart3, Building2 } from "lucide-react";
import { HOME_STRINGS } from '@/constants/home.constants';
import styles from './DashboardStats.module.css';

interface DashboardStatsProps {
  totalAthletes: number | null;
  totalClubs: number | null;
  totalAppointmentsToday: number | null;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  totalAthletes, 
  totalClubs,
  totalAppointmentsToday
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{HOME_STRINGS.DASHBOARD_TITLE}</h1>
        <p className={styles.description}>{HOME_STRINGS.DASHBOARD_DESCRIPTION}</p>
      </div>

      <div className={styles.statsGrid}>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>{HOME_STRINGS.ATHLETES_LABEL}</CardTitle>
            <UsersRound className={styles.icon} />
          </CardHeader>
          <CardContent>
            <div className={styles.statValue}>{totalAthletes}</div>
            <Button asChild size="sm" className={styles.actionButton}>
              <Link href="/home/athletes">{HOME_STRINGS.VIEW_ATHLETES}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>{HOME_STRINGS.CLUBS_LABEL}</CardTitle>
            <Shield className={styles.icon} />
          </CardHeader>
          <CardContent>
            <div className={styles.statValue}>{totalClubs}</div>
            <Button asChild size="sm" className={styles.actionButton}>
              <Link href="/home/clubs">{HOME_STRINGS.VIEW_CLUBS}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>{HOME_STRINGS.STATISTICS_LABEL}</CardTitle>
            <BarChart3 className={styles.icon} />
          </CardHeader>
          <CardContent>
            <div className={styles.statValue}>2025</div>
            <Button asChild size="sm" className={styles.actionButton}>
              <Link href="/home/statistics">{HOME_STRINGS.VIEW_STATISTICS}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>{HOME_STRINGS.TRAINING_CENTER_LABEL}</CardTitle>
            <Building2 className={styles.icon} />
          </CardHeader>
          <CardContent>
            <div className={styles.statValue}>{totalAppointmentsToday ?? 0}</div>
            <Button asChild size="sm" className={styles.actionButton}>
              <Link href="/home/training-centers">{HOME_STRINGS.VIEW_TRAINING_CENTER}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
