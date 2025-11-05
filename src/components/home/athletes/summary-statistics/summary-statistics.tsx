import { Card, CardContent } from "@/components/ui/card";
import { Users, User, Goal } from "lucide-react";
import { PlayerResponse } from "@/lib/types";

interface Athlete extends PlayerResponse {
    club_id: number | null;
    clubName?: string;
    player_type?: string;
    updated_at?: string;
}

interface SummaryStatisticsProps {
    filteredAthletes: Athlete[];
    jogadoresCampo: Athlete[];
    goleiros: Athlete[];
}

export const SummaryStatistics = ({ filteredAthletes, jogadoresCampo, goleiros }: SummaryStatisticsProps) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                        <p className="text-2xl font-bold">{filteredAthletes.length}</p>
                        <p className="text-sm text-muted-foreground">Total de Atletas</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <User className="h-8 w-8 text-green-600" />
                    <div>
                        <p className="text-2xl font-bold">{jogadoresCampo.length}</p>
                        <p className="text-sm text-muted-foreground">Jogadores de Campo</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Goal className="h-8 w-8 text-purple-600" />
                    <div>
                        <p className="text-2xl font-bold">{goleiros.length}</p>
                        <p className="text-sm text-muted-foreground">Goleiros</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);
