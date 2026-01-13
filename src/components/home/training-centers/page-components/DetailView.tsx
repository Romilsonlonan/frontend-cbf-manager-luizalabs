"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AthleteDataForm } from '../AthleteDataForm';
import { ProgressDashboard } from '../ProgressDashboard';
import { Athlete } from '@/lib/types';
import { TRAINING_CENTERS_STRINGS } from '@/constants/training-centers.constants';
import styles from './DetailView.module.css';

interface DetailViewProps {
  selectedAthlete: Athlete | null;
  onBack: () => void;
  onSaveSuccess: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  selectedAthlete,
  onBack,
  onSaveSuccess,
}) => {
  if (!selectedAthlete) return null;

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <Button variant="ghost" size="icon" onClick={onBack} className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
        </Button>
        <h2 className={styles.title}>
          {TRAINING_CENTERS_STRINGS.ATHLETE_DETAILS}
        </h2>
      </div>

      <div className={styles.contentGrid}>
        <AthleteDataForm 
          athlete={selectedAthlete} 
          onSaveSuccess={onSaveSuccess} 
        />
        <ProgressDashboard athlete={selectedAthlete} />
      </div>
    </motion.div>
  );
};
