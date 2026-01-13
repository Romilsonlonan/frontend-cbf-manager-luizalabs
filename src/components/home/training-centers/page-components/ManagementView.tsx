"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, User } from 'lucide-react';
import { Athlete, ClubSimpleResponse as Club, Position } from '@/lib/types';
import { TRAINING_CENTERS_STRINGS } from '@/constants/training-centers.constants';
import styles from './ManagementView.module.css';

interface ManagementViewProps {
  selectedClub: Club | null;
  selectedPosition: Position | null;
  clubs: Club[];
  athletes: Athlete[];
  positions: { name: Position, label: string, icon: React.FC<any> }[];
  positionMap: Record<Position, string>;
  onBack: () => void;
  onSelectClub: (club: Club) => void;
  onSelectPosition: (pos: Position) => void;
  onSelectAthlete: (athlete: Athlete) => void;
}

export const ManagementView: React.FC<ManagementViewProps> = ({
  selectedClub,
  selectedPosition,
  clubs,
  athletes,
  positions,
  positionMap,
  onBack,
  onSelectClub,
  onSelectPosition,
  onSelectAthlete,
}) => {
  const clubAthletes = selectedClub ? athletes.filter(a => a.club_id === selectedClub.id) : [];
  const filteredAthletes = selectedPosition ? clubAthletes.filter(a => a.position === selectedPosition) : [];

  return (
    <motion.div
      key={selectedClub ? `management-club-${selectedClub.id}` : "management-clubs"}
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
          {selectedClub ? TRAINING_CENTERS_STRINGS.ATHLETES_BY_CLUB(selectedClub.name) : TRAINING_CENTERS_STRINGS.SELECT_CLUB}
        </h2>
      </div>

      {!selectedClub ? (
        clubs.length === 0 ? (
          <div className={styles.emptyState}>
            <Shield className={styles.emptyIcon} />
            <p className={styles.emptyText}>{TRAINING_CENTERS_STRINGS.NO_CLUBS_FOUND}</p>
            <p className={styles.emptySubtext}>{TRAINING_CENTERS_STRINGS.NO_CLUBS_DESC}</p>
          </div>
        ) : (
          <div className={styles.clubsGrid}>
            {clubs.map((club, index) => (
              <Card key={`club-${club.id}-${index}`} className={styles.clubCard} onClick={() => onSelectClub(club)}>
                <CardContent className={styles.clubCardContent}>
                  <div className={styles.shieldWrapper}>
                    {club.shield_image_url ? (
                      <Image
                        src={club.shield_image_url.startsWith('http') ? club.shield_image_url : `http://localhost:8000${club.shield_image_url}`}
                        alt={club.name}
                        fill
                        className={styles.shieldImage}
                      />
                    ) : (
                      <Shield className={styles.shieldPlaceholder} />
                    )}
                  </div>
                  <p className={styles.clubName}>{club.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : !selectedPosition ? (
        <div className={styles.positionsWrapper}>
          <h3 className={styles.sectionTitle}>{TRAINING_CENTERS_STRINGS.SELECT_POSITION}</h3>
          <div className={styles.positionsGrid}>
            {positions.map((pos, index) => (
              <Card
                key={`position-${pos.name}-${index}`}
                className={`${styles.positionCard} group`}
                onClick={() => onSelectPosition(pos.name)}
              >
                <CardContent className={styles.positionCardContent}>
                  <div className={styles.positionIconWrapper}>
                    <pos.icon className={styles.positionIcon} />
                  </div>
                  <p className={styles.positionLabel}>{pos.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className={styles.sectionTitle}>
            {TRAINING_CENTERS_STRINGS.ATHLETES_BY_POSITION(positionMap[selectedPosition])}
          </h3>
          {filteredAthletes.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>{TRAINING_CENTERS_STRINGS.NO_ATHLETES_FOUND}</p>
            </div>
          ) : (
            <div className={styles.athletesGrid}>
              {filteredAthletes.map((athlete, index) => (
                <Card key={`athlete-${athlete.id}-${index}`} className={styles.athleteCard} onClick={() => onSelectAthlete(athlete)}>
                  <CardContent className={styles.athleteCardContent}>
                    <div className={styles.athleteInfo}>
                      <div className={styles.avatarWrapper}>
                        {athlete.image_url ? (
                          <Image
                            src={athlete.image_url}
                            alt={athlete.name}
                            fill
                            className={styles.avatarImage}
                          />
                        ) : (
                          <User className={styles.avatarPlaceholder} />
                        )}
                      </div>
                      <div>
                        <p className={styles.athleteName}>{athlete.name}</p>
                        <p className={styles.athleteMeta}>{athlete.position} • {athlete.age} anos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
