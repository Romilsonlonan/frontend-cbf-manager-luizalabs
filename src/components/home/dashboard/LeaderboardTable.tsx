"use client";

import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCcw, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { TeamLogo } from '@/components/icons/team-logos';
import { TeamStats, SortKey } from '@/lib/types';
import { HOME_STRINGS, GLOSSARY_ITEMS } from '@/constants/home.constants';
import { cn } from '@/lib/utils';
import styles from './LeaderboardTable.module.css';

interface LeaderboardTableProps {
  data: TeamStats[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortConfig: { key: SortKey; direction: 'asc' | 'desc' };
  onSort: (key: SortKey) => void;
  isScraping: boolean;
  onRefresh: () => void;
  error: string | null;
}

const SortableHeader: React.FC<{
  columnKey: SortKey;
  label: string;
  onSort: (key: SortKey) => void;
  sortConfig: { key: SortKey; direction: 'asc' | 'desc' };
}> = ({ columnKey, label, onSort, sortConfig }) => {
  const isSorted = sortConfig.key === columnKey;
  const Icon = isSorted
    ? sortConfig.direction === 'desc'
      ? ArrowDown
      : ArrowUp
    : ArrowUpDown;

  return (
    <TableHead
      className={styles.sortableHeader}
      onClick={() => onSort(columnKey)}
    >
      <div className={styles.headerContent}>
        {label}
        <Icon className={styles.sortIcon} />
      </div>
    </TableHead>
  );
};

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  searchQuery,
  onSearchChange,
  sortConfig,
  onSort,
  isScraping,
  onRefresh,
  error,
}) => {
  const sortedAndFilteredTeams = useMemo(() => {
    const filtered = [...data].filter(team =>
      (team.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (b.p !== a.p) return b.p - a.p;
      if (b.v !== a.v) return b.v - a.v;
      if (b.sg !== a.sg) return b.sg - a.sg;
      if (b.gp !== a.gp) return b.gp - a.gp;
      return (a.name || '').localeCompare(b.name || '');
    });

    return filtered;
  }, [searchQuery, data]);

  const getPositionClass = (index: number) => {
    const total = sortedAndFilteredTeams.length;
    if (index < 4) return styles.libertadores;
    if (index < 6) return styles.preLibertadores;
    if (index >= total - 4) return styles.relegation;
    return styles.neutral;
  };

  return (
    <section>
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={onRefresh}>{HOME_STRINGS.RETRY_BUTTON}</Button>
        </div>
      )}
      <Card className={styles.leaderboardCard}>
        <CardHeader>
          <div className={styles.cardHeaderTop}>
            <CardTitle className={styles.cardTitle}>{HOME_STRINGS.LEADERBOARD_TITLE}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isScraping}
            >
              {isScraping ? (
                <LoadingSpinner className={styles.refreshIcon} />
              ) : (
                <RefreshCcw className={styles.refreshIcon} />
              )}
              {HOME_STRINGS.REFRESH_BUTTON}
            </Button>
          </div>
          <CardDescription>{HOME_STRINGS.LEADERBOARD_DESCRIPTION}</CardDescription>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              placeholder={HOME_STRINGS.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className={styles.tableWrapper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Time</TableHead>
                  <SortableHeader columnKey="p" label="P" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="j" label="J" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="v" label="V" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="e" label="E" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="d" label="D" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="gp" label="GP" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="gc" label="GC" onSort={onSort} sortConfig={sortConfig} />
                  <SortableHeader columnKey="sg" label="SG" onSort={onSort} sortConfig={sortConfig} />
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedAndFilteredTeams.map((team, index) => (
                  <TableRow key={team.name || `team-${index}`}>
                    <TableCell className={getPositionClass(index)}>{index + 1}</TableCell>
                    <TableCell className={styles.teamCell}>
                      <TeamLogo teamName={team.name} className={styles.teamLogo} />
                      <span className={styles.teamName}>{team.name}</span>
                    </TableCell>
                    <TableCell className={styles.pointsCell}>{team.p}</TableCell>
                    <TableCell>{team.j}</TableCell>
                    <TableCell>{team.v}</TableCell>
                    <TableCell>{team.e}</TableCell>
                    <TableCell>{team.d}</TableCell>
                    <TableCell>{team.gp}</TableCell>
                    <TableCell>{team.gc}</TableCell>
                    <TableCell>{team.sg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className={styles.glossary}>
            <p className={styles.glossaryTitle}>{HOME_STRINGS.GLOSSARY_TITLE}</p>
            <div className={styles.glossaryGrid}>
              {GLOSSARY_ITEMS.map((item) => (
                <div key={item.key} className={styles.glossaryItem}>
                  <span className={styles.glossaryKey}>{item.key}:</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
