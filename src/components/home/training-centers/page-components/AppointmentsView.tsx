"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppointmentCalendar } from '../AppointmentCalendar';
import { Athlete } from '@/lib/types';
import { TRAINING_CENTERS_STRINGS } from '@/constants/training-centers.constants';
import styles from './AppointmentsView.module.css';

interface AppointmentsViewProps {
  athletes: Athlete[];
  onBack: () => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({ athletes, onBack }) => {
  return (
    <motion.div
      key="appointments"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={styles.appointmentsContainer}
    >
      <div className={styles.header}>
        <Button variant="ghost" size="icon" onClick={onBack} className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
        </Button>
        <h2 className={styles.title}>
          {TRAINING_CENTERS_STRINGS.APPOINTMENTS_TITLE}
        </h2>
      </div>
      <AppointmentCalendar athletes={athletes} />
    </motion.div>
  );
};
