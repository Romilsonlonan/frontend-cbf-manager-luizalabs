"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    RefreshCw,
    PlusCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoalkeeperTable } from "@/components/home/athletes/goalkeeper-table/goalkeeper-table";
import { FieldPlayerTable } from "@/components/home/athletes/field-player-table/field-player-table";
import { AthletesFilters } from "@/components/home/athletes/athletes-filters/athletes-filters";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddAthleteModal } from '@/components/home/clubs/add-athlete-modal/add-athlete-modal';
import { AthletesFiltersClub } from '@/components/home/athletes/athletes-filters/athletes-filters-club';
import { PlayerCard } from "@/components/home/athletes/player-card/player-card";
import { GlossarioDialog } from "@/components/home/athletes/glossario-dialog/glossario-dialog";
import { SummaryStatistics } from "@/components/home/athletes/summary-statistics/summary-statistics";
import EmptyStateMessage from "@/components/home/athletes/shared/EmptyStateMessage";

import { Position, PlayerResponse, ClubSimpleResponse } from "@/lib/types";
import { getPlayers, getClubs } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Athlete extends PlayerResponse {
    club_id: number | null;
    clubName?: string;
    player_type?: string;
    updated_at?: string;
}

const fetchAthletesFromBackend = async (token: string | null, clubIdFilter: string): Promise<Athlete[]> => {
    try {
        if (!token) {
            console.warn('Token não disponível, retornando array vazio');
            return [];
        }

        const clubId = clubIdFilter === 'all' || clubIdFilter === '' ? null : parseInt(clubIdFilter);

        const playerResponses: PlayerResponse[] = await getPlayers(token, clubId);

        return playerResponses.map(player => ({
            id: player.id,
            name: player.name,
            club_id: player.club_id,
            clubName: player.club?.name,
            position: player.position,
            age: player.age,
            goals: player.goals,
            yellow_cards: player.yellow_cards,
            red_cards: player.red_cards,
            jersey_number: player.jersey_number,
            height: player.height,
            weight: player.weight,
            nationality: player.nationality,
            games: player.games,
            substitute_appearances: player.substitute_appearances,
            assists: player.assists,
            shots: player.shots,
            shots_on_goal: player.shots_on_goal,
            fouls_committed: player.fouls_committed,
            fouls_suffered: player.fouls_suffered,
            defenses: player.defenses,
            goals_conceded: player.goals_conceded,
            player_type: player.player_type,
            updated_at: player.updated_at,
        }));
    } catch (error) {
        console.error('Error fetching athletes from backend:', error);
        return [];
    }
};

const fetchClubsFromBackend = async (): Promise<ClubSimpleResponse[]> => {
    try {
        const clubs: ClubSimpleResponse[] = await getClubs();
        return clubs;
    } catch (error) {
        console.error('Error fetching clubs from backend:', error);
        return [];
    }
};

export default function AtletasPage(): JSX.Element {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [clubs, setClubs] = useState<ClubSimpleResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const { token, isAuthenticated, loadingUser } = useAuth(); // Corrected to loadingUser

    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState<(Position | 'all')[]>(['all']);
    const [clubFilter, setClubFilter] = useState('all');
    const [trainingCenterFilter, setTrainingCenterFilter] = useState('all');
    const [ageFilter, setAgeFilter] = useState<[number, number]>([0, Infinity]);
    const [heightFilter, setHeightFilter] = useState<[number, number]>([0, Infinity]);
    const [weightFilter, setWeightFilter] = useState<[number, number]>([0, Infinity]);
    const [nationalityFilter, setNationalityFilter] = useState('');
    const [gamesFilter, setGamesFilter] = useState<[number, number]>([0, Infinity]);
    const [substituteAppearancesFilter, setSubstituteAppearancesFilter] = useState<[number, number]>([0, Infinity]);
    const [goalsFilter, setGoalsFilter] = useState<[number, number]>([0, Infinity]);
    const [assistsFilter, setAssistsFilter] = useState<[number, number]>([0, Infinity]);
    const [shotsFilter, setShotsFilter] = useState<[number, number]>([0, Infinity]);
    const [shotsOnGoalFilter, setShotsOnGoalFilter] = useState<[number, number]>([0, Infinity]);
    const [foulsCommittedFilter, setFoulsCommittedFilter] = useState<[number, number]>([0, Infinity]);
    const [foulsSufferedFilter, setFoulsSufferedFilter] = useState<[number, number]>([0, Infinity]);
    const [yellowCardsFilter, setYellowCardsFilter] = useState<[number, number]>([0, Infinity]);
    const [redCardsFilter, setRedCardsFilter] = useState<[number, number]>([0, Infinity]);
    const [defensesFilter, setDefensesFilter] = useState<[number, number]>([0, Infinity]);
    const [goalsConcededFilter, setGoalsConcededFilter] = useState<[number, number]>([0, Infinity]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    // Mock data for positions, clubs, and training centers (replace with actual API calls)
    const positions: Position[] = ["A", "D", "M", "G"];
    const trainingCenters = ["CT do Vasco"]; // This might need to be dynamic based on clubs

    useEffect(() => {
        const loadData = async () => {
            if (loadingUser) { // Use loadingUser here
                return;
            }

            if (!isAuthenticated || !token) {
                setLoading(false);
                setAthletes([]);
                setClubs([]);
                return;
            }

            try {
                setLoading(true);
                const [athletesData, clubsData] = await Promise.all([
                    fetchAthletesFromBackend(token, clubFilter),
                    fetchClubsFromBackend(),
                ]);
                setAthletes(athletesData);
                setClubs(clubsData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                toast({
                    title: "Erro",
                    description: "Erro ao carregar dados dos atletas e clubes",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [token, clubFilter, isAuthenticated, loadingUser, toast]); // Use loadingUser here

    const handleAtualizacaoCompleta = () => {
        // Re-fetch all data after an update
        if (isAuthenticated && token) {
            setLoading(true);
            Promise.all([
                fetchAthletesFromBackend(token, clubFilter),
                fetchClubsFromBackend(),
            ]).then(([athletesData, clubsData]) => {
                setAthletes(athletesData);
                setClubs(clubsData);
            }).catch(error => {
                console.error('Erro ao recarregar dados:', error);
                toast({
                    title: "Erro",
                    description: "Erro ao recarregar dados após atualização",
                    variant: "destructive",
                });
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const filterAthletes = useCallback((athletesToFilter: Athlete[]) => {
        return athletesToFilter.filter((athlete) => {
            const matchesName = nameFilter === '' || (athlete.name ?? '').toLowerCase().includes(nameFilter.toLowerCase());
            const matchesPosition = positionFilter.includes('all') || positionFilter.includes(athlete.position ?? '');
            const matchesClub = clubFilter === 'all' || clubFilter === '' || (athlete.club_id ?? '').toString() === clubFilter;
            const matchesAge = (athlete.age ?? 0) >= ageFilter[0] && (athlete.age ?? 0) <= ageFilter[1];
            const matchesGames = (athlete.games ?? 0) >= gamesFilter[0] && (athlete.games ?? 0) <= gamesFilter[1];
            const matchesGoals = (athlete.goals ?? 0) >= goalsFilter[0] && (athlete.goals ?? 0) <= goalsFilter[1];
            const matchesAssists = (athlete.assists ?? 0) >= assistsFilter[0] && (athlete.assists ?? 0) <= assistsFilter[1];
            const matchesShots = (athlete.shots ?? 0) >= shotsFilter[0] && (athlete.shots ?? 0) <= shotsFilter[1];
            const matchesSaves = (athlete.defenses ?? 0) >= defensesFilter[0] && (athlete.defenses ?? 0) <= defensesFilter[1];
            const matchesHeight = (athlete.height ?? 0) >= heightFilter[0] && (athlete.height ?? 0) <= heightFilter[1];
            const matchesWeight = (athlete.weight ?? 0) >= weightFilter[0] && (athlete.weight ?? 0) <= weightFilter[1];
            const matchesNationality = nationalityFilter === '' || (athlete.nationality ?? '').toLowerCase().includes(nationalityFilter.toLowerCase());
            const matchesSubstituteAppearances = (athlete.substitute_appearances ?? 0) >= substituteAppearancesFilter[0] && (athlete.substitute_appearances ?? 0) <= substituteAppearancesFilter[1];
            const matchesShotsOnGoal = (athlete.shots_on_goal ?? 0) >= shotsOnGoalFilter[0] && (athlete.shots_on_goal ?? 0) <= shotsOnGoalFilter[1];
            const matchesFoulsCommitted = (athlete.fouls_committed ?? 0) >= foulsCommittedFilter[0] && (athlete.fouls_committed ?? 0) <= foulsCommittedFilter[1];
            const matchesFoulsSuffered = (athlete.fouls_suffered ?? 0) >= foulsSufferedFilter[0] && (athlete.fouls_suffered ?? 0) <= foulsSufferedFilter[1];
            const matchesYellowCards = (athlete.yellow_cards ?? 0) >= yellowCardsFilter[0] && (athlete.yellow_cards ?? 0) <= yellowCardsFilter[1];
            const matchesRedCards = (athlete.red_cards ?? 0) >= redCardsFilter[0] && (athlete.red_cards ?? 0) <= redCardsFilter[1];
            const matchesDefenses = (athlete.defenses ?? 0) >= defensesFilter[0] && (athlete.defenses ?? 0) <= defensesFilter[1];
            const matchesGoalsConceded = (athlete.goals_conceded ?? 0) >= goalsConcededFilter[0] && (athlete.goals_conceded ?? 0) <= goalsConcededFilter[1];


            return matchesName && matchesPosition && matchesClub &&
                matchesAge && matchesGames && matchesGoals && matchesAssists &&
                matchesShots && matchesSaves && matchesHeight && matchesWeight &&
                matchesNationality && matchesSubstituteAppearances && matchesShotsOnGoal &&
                matchesFoulsCommitted && matchesFoulsSuffered && matchesYellowCards &&
                matchesRedCards && matchesDefenses && matchesGoalsConceded;
        });
    }, [nameFilter, positionFilter, clubFilter, ageFilter, gamesFilter, goalsFilter, assistsFilter, shotsFilter, defensesFilter, heightFilter, weightFilter, nationalityFilter, substituteAppearancesFilter, shotsOnGoalFilter, foulsCommittedFilter, foulsSufferedFilter, yellowCardsFilter, redCardsFilter, goalsConcededFilter]);

    const filteredAthletes = filterAthletes(athletes);
    const goleiros = filteredAthletes.filter(p => p.player_type === "goleiro");
    const jogadoresCampo = filteredAthletes.filter(p => p.player_type === "jogador");

    const handleAddAthlete = (formData: Record<string, string>) => {
        console.log('Novo atleta adicionado:', formData);
        handleAtualizacaoCompleta();
    };


    if (loading || loadingUser) { // Add loadingUser to display spinner during auth loading
        return (
            <div className="container mx-auto p-6 max-w-5xl">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex flex-col">
                        <CardTitle className="text-2xl font-bold">Análise de Atletas</CardTitle>
                        <CardDescription>
                            Filtre e analise os atletas cadastrados no sistema.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <AthletesFiltersClub
                            clubFilter={clubFilter}
                            setClubFilter={setClubFilter}
                            clubs={clubs.map(club => ({ value: club.id.toString(), label: club.name }))}
                        />
                        <Dialog>
                            <AddAthleteModal clubs={clubs} onAddAthlete={handleAddAthlete} />
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 p-0 overflow-y-auto">
                    <div className="flex flex-col sm:flex-row gap-4 px-6 pt-0 pb-6 border-b">
                        <AthletesFilters
                            nameFilter={nameFilter}
                            setNameFilter={setNameFilter}
                            positionFilter={positionFilter}
                            setPositionFilter={setPositionFilter}
                            clubFilter={clubFilter}
                            setClubFilter={setClubFilter}
                            trainingCenterFilter={trainingCenterFilter}
                            setTrainingCenterFilter={setTrainingCenterFilter}
                            positions={positions}
                            clubs={clubs.map(club => ({ value: club.id.toString(), label: club.name }))}
                            trainingCenters={trainingCenters}
                            ageFilter={ageFilter}
                            setAgeFilter={setAgeFilter}
                            heightFilter={heightFilter}
                            setHeightFilter={setHeightFilter}
                            weightFilter={weightFilter}
                            setWeightFilter={setWeightFilter}
                            nationalityFilter={nationalityFilter}
                            setNationalityFilter={setNationalityFilter}
                            gamesFilter={gamesFilter}
                            setGamesFilter={setGamesFilter}
                            substituteAppearancesFilter={substituteAppearancesFilter}
                            setSubstituteAppearancesFilter={setSubstituteAppearancesFilter}
                            goalsFilter={goalsFilter}
                            setGoalsFilter={setGoalsFilter}
                            assistsFilter={assistsFilter}
                            setAssistsFilter={setAssistsFilter}
                            shotsFilter={shotsFilter}
                            setShotsFilter={setShotsFilter}
                            shotsOnGoalFilter={shotsOnGoalFilter}
                            setShotsOnGoalFilter={setShotsOnGoalFilter}
                            foulsCommittedFilter={foulsCommittedFilter}
                            setFoulsCommittedFilter={setFoulsCommittedFilter}
                            foulsSufferedFilter={foulsSufferedFilter}
                            setFoulsSufferedFilter={setFoulsSufferedFilter}
                            yellowCardsFilter={yellowCardsFilter}
                            setYellowCardsFilter={setYellowCardsFilter}
                            redCardsFilter={redCardsFilter}
                            setRedCardsFilter={setRedCardsFilter}
                            defensesFilter={defensesFilter}
                            setDefensesFilter={setDefensesFilter}
                            goalsConcededFilter={goalsConcededFilter}
                            setGoalsConcededFilter={setGoalsConcededFilter}
                            savesFilter={defensesFilter}
                            setSavesFilter={setDefensesFilter}
                        />
                    </div>

                    <ScrollArea className="flex-1 h-px">
                        <div className="px-6 space-y-8">
                            {/* Estatísticas */}
                            <SummaryStatistics
                                filteredAthletes={filteredAthletes}
                                jogadoresCampo={jogadoresCampo}
                                goleiros={goleiros}
                            />

                            {/* Tabs de Atletas */}
                            <Tabs defaultValue="todos" className="space-y-4">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="todos">Todos ({filteredAthletes.length})</TabsTrigger>
                                    <TabsTrigger value="goleiros">Goleiros ({goleiros.length})</TabsTrigger>
                                    <TabsTrigger value="jogadores">Jogadores ({jogadoresCampo.length})</TabsTrigger>
                                </TabsList>

                                <TabsContent value="todos" className="space-y-4">
                                    {filteredAthletes.length === 0 ? (
                                        <EmptyStateMessage type="all" />
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {filteredAthletes.map((player) => (
                                                <PlayerCard key={player.id} player={player} />
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="goleiros" className="space-y-4">
                                    {goleiros.length === 0 ? (
                                        <EmptyStateMessage type="goalkeepers" />
                                    ) : (
                                        <GoalkeeperTable goalkeepers={goleiros} />
                                    )}
                                </TabsContent>

                                <TabsContent value="jogadores" className="space-y-4">
                                    {jogadoresCampo.length === 0 ? (
                                        <EmptyStateMessage type="fieldPlayers" />
                                    ) : (
                                        <FieldPlayerTable fieldPlayers={jogadoresCampo} />
                                    )}
                                </TabsContent>
                            </Tabs>

                            {/* Glossário */}
                            <GlossarioDialog />
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
