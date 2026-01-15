'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AddClubModal } from '@/components/home/clubs/add-club-modal/add-club-modal'
import { EditClubModal } from '@/components/home/clubs/edit-club-modal/edit-club-modal'
import { Plus, Users, Calendar, Trophy, Building, Search, Building2, Pencil, Trash2 } from 'lucide-react'
import { CLUBS_CONSTANTS } from './constants'
import { ClubsViewProps } from './types'
import styles from './ClubsView.module.css'

export const ClubsView: React.FC<ClubsViewProps> = ({
  clubs,
  loading,
  isDeleting,
  clubModalOpen,
  editModalOpen,
  clubToEdit,
  onSetClubModalOpen,
  onSetEditModalOpen,
  onSetClubToEdit,
  onDeleteClub,
  onScrapePlayers,
  onFetchClubs,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{CLUBS_CONSTANTS.TITLE}</h1>
        <div className={styles.headerActions}>
          <Button onClick={() => onSetClubModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {CLUBS_CONSTANTS.ADD_CLUB_BUTTON}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingWrapper}>{CLUBS_CONSTANTS.LOADING_MESSAGE}</div>
      ) : clubs.length === 0 ? (
        <Card>
          <CardContent className={styles.emptyCard}>
            <Users className={styles.emptyIcon} />
            <p className={styles.emptyText}>{CLUBS_CONSTANTS.NO_CLUBS_MESSAGE}</p>
            <Button onClick={() => onSetClubModalOpen(true)} className={styles.addFirstButton}>
              {CLUBS_CONSTANTS.ADD_FIRST_CLUB_BUTTON}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={styles.clubsGrid}>
          {clubs.map((club) => (
            <Card key={club.id} className={styles.clubCard}>
              <CardContent className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  {club.shield_image_url ? (
                    <img
                      src={`http://localhost:8000${club.shield_image_url}`}
                      alt={`Escudo ${club.name}`}
                      className={styles.shieldImage}
                    />
                  ) : (
                    <div className={styles.shieldPlaceholder}>
                      <Users className={styles.shieldIcon} />
                    </div>
                  )}
                  <div className={styles.clubInfoMain}>
                    <h3 className={styles.clubName}>{club.name}</h3>
                    <div className={styles.actionButtons}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          onSetClubToEdit(club);
                          onSetEditModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteClub(club.id, club.name)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <p className={styles.initials}>{club.initials}</p>
                </div>

                <div className={styles.detailsList}>
                  <div className={styles.detailItem}>
                    <Building className={styles.detailIcon} />
                    <span>{club.city}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar className={styles.detailIcon} />
                    <span>
                      Fundado em{' '}
                      {club.foundation_date
                        ? new Date(club.foundation_date).toLocaleDateString('pt-BR')
                        : 'Data desconhecida'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <Trophy className={styles.detailIcon} />
                    <span>{club.br_titles} títulos brasileiros</span>
                  </div>
                  {club.training_center && (
                    <div className={styles.detailItem}>
                      <Building2 className={styles.detailIcon} />
                      <span>{club.training_center}</span>
                    </div>
                  )}
                </div>
                <div className={styles.footer}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={styles.scrapeButton}
                    onClick={() => onScrapePlayers(club.id, club.name)}
                    disabled={!club.espn_url}
                    title={!club.espn_url ? "Adicione a URL da ESPN para este clube para raspar jogadores" : `Raspar jogadores de ${club.name}`}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Raspar Jogadores
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddClubModal
        open={clubModalOpen}
        onOpenChange={onSetClubModalOpen}
        onClubAdded={onFetchClubs}
      />

      <EditClubModal
        open={editModalOpen}
        onOpenChange={onSetEditModalOpen}
        clubToEdit={clubToEdit}
        onClubUpdated={onFetchClubs}
      />
    </div>
  )
}
