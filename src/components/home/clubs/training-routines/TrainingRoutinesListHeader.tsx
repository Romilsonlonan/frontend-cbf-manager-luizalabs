"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ClubSimpleResponse } from '@/lib/types';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import styles from './TrainingRoutinesListHeader.module.css';

interface TrainingRoutinesListHeaderProps {
  clubDetails: ClubSimpleResponse | null;
  onAddClick: () => void;
}

export const TrainingRoutinesListHeader: React.FC<TrainingRoutinesListHeaderProps> = ({
  clubDetails,
  onAddClick,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          {TRAINING_ROUTINE_STRINGS.LIST_PAGE_TITLE(clubDetails?.training_center || '...')}
        </h1>
        {clubDetails?.shield_image_url && (
          <Image
            src={clubDetails.shield_image_url}
            alt={`${clubDetails.name} shield`}
            width={50}
            height={50}
            className={styles.shield}
          />
        )}
      </div>
      <Button onClick={onAddClick} className={styles.addButton}>
        {TRAINING_ROUTINE_STRINGS.BUTTON_ADD_NEW}
      </Button>
    </div>
  );
};
