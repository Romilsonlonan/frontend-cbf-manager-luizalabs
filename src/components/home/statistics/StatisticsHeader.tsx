"use client";

import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Club } from '@/lib/definitions';
import { STATISTICS_STRINGS } from '@/constants/statistics.constants';
import styles from './StatisticsHeader.module.css';

interface StatisticsHeaderProps {
  clubs: Club[];
  onClubChange: (clubName: string) => void;
}

export const StatisticsHeader: React.FC<StatisticsHeaderProps> = ({ clubs, onClubChange }) => {
  return (
    <Card className={styles.headerCard}>
      <CardHeader className={styles.cardHeader}>
        <div className={styles.titleWrapper}>
          <CardTitle className={styles.title}>{STATISTICS_STRINGS.PAGE_TITLE}</CardTitle>
          <CardDescription className={styles.description}>
            {STATISTICS_STRINGS.PAGE_DESCRIPTION}
          </CardDescription>
        </div>
        <Select onValueChange={onClubChange} defaultValue={STATISTICS_STRINGS.ALL_CLUBS}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder={STATISTICS_STRINGS.SELECT_CLUB_PLACEHOLDER} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATISTICS_STRINGS.ALL_CLUBS}>{STATISTICS_STRINGS.ALL_CLUBS}</SelectItem>
            {clubs.map((club) => (
              <SelectItem key={club.id} value={club.name}>
                {club.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
    </Card>
  );
};
