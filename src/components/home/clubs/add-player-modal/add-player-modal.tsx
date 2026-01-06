import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddPlayerModalInput } from './add-player-modal-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { AddPlayerModalButton } from './add-player-modal-button'
import { AddPlayerModalCloseButton } from './add-player-modal-close-button'
import { AddPlayerModalSelect } from './add-player-modal-select'

interface Club {
    id: number
    name: string
}

interface AddPlayerModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onPlayerAdded: () => void
}

export function AddPlayerModal({ open, onOpenChange, onPlayerAdded }: AddPlayerModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        position: '', // 'Goleiro', 'Defensor', 'Meio-campista', 'Atacante'
        club_id: '',
        age: '',
        height: '',
        weight: '',
        nationality: '',
        games: '',
        substitutions: '',
        assists: '',
        fouls_committed: '',
        fouls_suffered: '',
        yellow_cards: '',
        red_cards: '',
        // Specific for Goalkeeper
        saves: '',
        goals_conceded: '',
        // Specific for Field Player
        goals: '',
        total_shots: '',
        shots_on_goal: '',
    });
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const positions = [
        { label: 'Goleiro', value: 'Goleiro' },
        { label: 'Defensor', value: 'Defensor' },
        { label: 'Meio-campista', value: 'Meio-campista' },
        { label: 'Atacante', value: 'Atacante' },
    ];

    const fetchClubs = async () => {
        try {
            const response = await fetch('http://localhost:8000/clubs/')
            const data = await response.json()
            setClubs(data)
        } catch (err) {
            console.error('Erro ao buscar clubes:', err)
        }
    }

    useEffect(() => {
        if (open) {
            fetchClubs()
        }
    }, [open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let endpoint = '';
            let playerData: any = {
                name: formData.name,
                position: formData.position,
                club_id: parseInt(formData.club_id),
                age: parseInt(formData.age),
                height: parseFloat(formData.height),
                weight: parseFloat(formData.weight),
                nationality: formData.nationality,
                games: parseInt(formData.games),
                substitutions: parseInt(formData.substitutions),
                assists: parseInt(formData.assists),
                fouls_committed: parseInt(formData.fouls_committed),
                fouls_suffered: parseInt(formData.fouls_suffered),
                yellow_cards: parseInt(formData.yellow_cards),
                red_cards: parseInt(formData.red_cards),
            };

            if (formData.position === 'Goleiro') {
                endpoint = 'http://localhost:8000/goalkeepers/';
                playerData = {
                    ...playerData,
                    saves: parseInt(formData.saves),
                    goals_conceded: parseInt(formData.goals_conceded),
                };
            } else {
                endpoint = 'http://localhost:8000/field_players/';
                playerData = {
                    ...playerData,
                    goals: parseInt(formData.goals),
                    total_shots: parseInt(formData.total_shots),
                    shots_on_goal: parseInt(formData.shots_on_goal),
                };
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(playerData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro ao adicionar jogador');
            }

            // Limpar formulário
            setFormData({
                name: '',
                position: '',
                club_id: '',
                age: '',
                height: '',
                weight: '',
                nationality: '',
                games: '',
                substitutions: '',
                assists: '',
                fouls_committed: '',
                fouls_suffered: '',
                yellow_cards: '',
                red_cards: '',
                saves: '',
                goals_conceded: '',
                goals: '',
                total_shots: '',
                shots_on_goal: '',
            });

            // Fechar modal e notificar
            onOpenChange(false);
            onPlayerAdded();
        } catch (err: any) {
            setError(err.message || 'Erro ao adicionar jogador. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Jogador</DialogTitle>
                </DialogHeader>

                {clubs.length === 0 ? (
                    <div className="py-8 text-center space-y-4">
                        <p className="text-gray-500">
                            Não há clubes cadastrados. É necessário cadastrar pelo menos um clube antes de adicionar jogadores.
                        </p>
                        <AddPlayerModalCloseButton onClose={() => onOpenChange(false)} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="name"
                                label="Nome"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Nome do jogador"
                            />

                            <AddPlayerModalSelect
                                id="position"
                                label="Posição"
                                value={formData.position}
                                onValueChange={(value) => setFormData({ ...formData, position: value })}
                                options={positions}
                                required
                                placeholder="Selecione a posição"
                            />
                        </div>

                        <AddPlayerModalSelect
                            id="club"
                            label="Clube"
                            value={formData.club_id}
                            onValueChange={(value) => setFormData({ ...formData, club_id: value })}
                            options={clubs.map(club => ({ value: club.id.toString(), label: club.name }))}
                            required
                            placeholder="Selecione o clube"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="age"
                                label="Idade"
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                required
                                min="16"
                                max="50"
                                placeholder="Idade"
                            />
                            <AddPlayerModalInput
                                id="height"
                                label="Altura (m)"
                                type="number"
                                step="0.01"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                placeholder="Altura"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="weight"
                                label="Peso (kg)"
                                type="number"
                                step="0.01"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="Peso"
                            />
                            <AddPlayerModalInput
                                id="nationality"
                                label="Nacionalidade"
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                placeholder="Nacionalidade"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="games"
                                label="Jogos"
                                type="number"
                                value={formData.games}
                                onChange={(e) => setFormData({ ...formData, games: e.target.value })}
                                min="0"
                                placeholder="Jogos"
                            />
                            <AddPlayerModalInput
                                id="substitutions"
                                label="Substituições"
                                type="number"
                                value={formData.substitutions}
                                onChange={(e) => setFormData({ ...formData, substitutions: e.target.value })}
                                min="0"
                                placeholder="Substituições"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="assists"
                                label="Assistências"
                                type="number"
                                value={formData.assists}
                                onChange={(e) => setFormData({ ...formData, assists: e.target.value })}
                                min="0"
                                placeholder="Assistências"
                            />
                            <AddPlayerModalInput
                                id="fouls_committed"
                                label="Faltas Cometidas"
                                type="number"
                                value={formData.fouls_committed}
                                onChange={(e) => setFormData({ ...formData, fouls_committed: e.target.value })}
                                min="0"
                                placeholder="Faltas Cometidas"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="fouls_suffered"
                                label="Faltas Sofridas"
                                type="number"
                                value={formData.fouls_suffered}
                                onChange={(e) => setFormData({ ...formData, fouls_suffered: e.target.value })}
                                min="0"
                                placeholder="Faltas Sofridas"
                            />
                            <AddPlayerModalInput
                                id="yellow_cards"
                                label="Cartões Amarelos"
                                type="number"
                                value={formData.yellow_cards}
                                onChange={(e) => setFormData({ ...formData, yellow_cards: e.target.value })}
                                min="0"
                                placeholder="Amarelos"
                            />
                        </div>

                        <AddPlayerModalInput
                            id="red_cards"
                            label="Cartões Vermelhos"
                            type="number"
                            value={formData.red_cards}
                            onChange={(e) => setFormData({ ...formData, red_cards: e.target.value })}
                            min="0"
                            placeholder="Vermelhos"
                        />

                        {formData.position === 'Goleiro' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <AddPlayerModalInput
                                        id="saves"
                                        label="Defesas"
                                        type="number"
                                        value={formData.saves}
                                        onChange={(e) => setFormData({ ...formData, saves: e.target.value })}
                                        min="0"
                                        placeholder="Defesas"
                                    />
                                    <AddPlayerModalInput
                                        id="goals_conceded"
                                        label="Gols Sofridos"
                                        type="number"
                                        value={formData.goals_conceded}
                                        onChange={(e) => setFormData({ ...formData, goals_conceded: e.target.value })}
                                        min="0"
                                        placeholder="Gols Sofridos"
                                    />
                                </div>
                            </>
                        )}

                        {formData.position !== 'Goleiro' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <AddPlayerModalInput
                                        id="goals"
                                        label="Gols"
                                        type="number"
                                        value={formData.goals}
                                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                                        min="0"
                                        placeholder="Gols"
                                    />
                                    <AddPlayerModalInput
                                        id="total_shots"
                                        label="Chutes Totais"
                                        type="number"
                                        value={formData.total_shots}
                                        onChange={(e) => setFormData({ ...formData, total_shots: e.target.value })}
                                        min="0"
                                        placeholder="Chutes Totais"
                                    />
                                </div>
                                <AddPlayerModalInput
                                    id="shots_on_goal"
                                    label="Chutes a Gol"
                                    type="number"
                                    value={formData.shots_on_goal}
                                    onChange={(e) => setFormData({ ...formData, shots_on_goal: e.target.value })}
                                    min="0"
                                    placeholder="Chutes a Gol"
                                />
                            </>
                        )}

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <AddPlayerModalButton loading={loading} onCancel={() => onOpenChange(false)} />
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
