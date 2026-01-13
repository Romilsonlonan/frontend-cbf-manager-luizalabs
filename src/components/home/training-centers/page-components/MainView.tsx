"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ClipboardEdit, UtensilsCrossed } from 'lucide-react';
import { NutritionalPlanModal } from '../NutritionalPlanModal';
import { Athlete, ClubSimpleResponse as Club } from '@/lib/types';
import { TRAINING_CENTERS_STRINGS } from '@/constants/training-centers.constants';
import styles from './MainView.module.css';

interface MainViewProps {
  athletes: Athlete[];
  clubs: Club[];
  onViewChange: (view: 'appointments' | 'management') => void;
}

export const MainView: React.FC<MainViewProps> = ({ athletes, clubs, onViewChange }) => {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={styles.mainViewContainer}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>{TRAINING_CENTERS_STRINGS.PAGE_TITLE}</h1>
        <p className={styles.description}>{TRAINING_CENTERS_STRINGS.PAGE_DESCRIPTION}</p>
      </header>
      <div className={styles.mainGrid}>
        <Card
          className={styles.actionCard}
          onClick={() => onViewChange('appointments')}
        >
          <CardHeader className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <CalendarIcon className={styles.icon} />
            </div>
            <CardTitle className={styles.cardTitle}>{TRAINING_CENTERS_STRINGS.APPOINTMENTS_TITLE}</CardTitle>
            <CardDescription>{TRAINING_CENTERS_STRINGS.APPOINTMENTS_DESC}</CardDescription>
          </CardHeader>
        </Card>
        <Card
          className={styles.actionCard}
          onClick={() => onViewChange('management')}
        >
          <CardHeader className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <ClipboardEdit className={styles.icon} />
            </div>
            <CardTitle className={styles.cardTitle}>{TRAINING_CENTERS_STRINGS.ATHLETE_DATA_TITLE}</CardTitle>
            <CardDescription>{TRAINING_CENTERS_STRINGS.ATHLETE_DATA_DESC}</CardDescription>
          </CardHeader>
        </Card>
        <NutritionalPlanModal athletes={athletes} clubs={clubs}>
            <Card className={styles.actionCard}>
              <CardHeader className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <UtensilsCrossed className={styles.icon} />
                </div>
                <CardTitle className={styles.cardTitle}>{TRAINING_CENTERS_STRINGS.NUTRITIONAL_PLAN_TITLE}</CardTitle>
                <CardDescription>{TRAINING_CENTERS_STRINGS.NUTRITIONAL_PLAN_DESC}</CardDescription>
              </CardHeader>
            </Card>
        </NutritionalPlanModal>
      </div>

      <div className={`${styles.heroImageWrapper} group`}>
        <Image
          src="https://i.ibb.co/WWKv8MLN/Empenho-Atletas.webp"
          alt={TRAINING_CENTERS_STRINGS.PERFORMANCE_TITLE}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <h3 className={styles.heroTitle}>{TRAINING_CENTERS_STRINGS.PERFORMANCE_TITLE}</h3>
            <p className={styles.heroDescription}>{TRAINING_CENTERS_STRINGS.PERFORMANCE_DESC}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
