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
        position: '',
        club_id: '',
        age: '',
        goals_2025: '0',
        salary: '',
        injuries_count: '0',
        yellow_cards: '0',
        red_cards: '0',
        wrong_passes: '0',
        correct_passes: '0'
    })
    const [clubs, setClubs] = useState<Club[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const positions = [
        'Goleiro',
        'Zagueiro',
        'Lateral Direito',
        'Lateral Esquerdo',
        'Volante',
        'Meio-campo',
        'Atacante',
        'Ponta Direita',
        'Ponta Esquerda',
        'Centroavante'
    ]

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
            const playerData = {
                name: formData.name,
                position: formData.position,
                club_id: parseInt(formData.club_id),
                age: parseInt(formData.age),
                goals_2025: parseInt(formData.goals_2025),
                salary: parseFloat(formData.salary),
                injuries_count: parseInt(formData.injuries_count),
                yellow_cards: parseInt(formData.yellow_cards),
                red_cards: parseInt(formData.red_cards),
                wrong_passes: parseInt(formData.wrong_passes),
                correct_passes: parseInt(formData.correct_passes)
            }

            const response = await fetch('http://localhost:8000/players/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(playerData)
            })

            if (!response.ok) {
                throw new Error('Erro ao adicionar jogador')
            }

            // Limpar formulário
            setFormData({
                name: '',
                position: '',
                club_id: '',
                age: '',
                goals_2025: '0',
                salary: '',
                injuries_count: '0',
                yellow_cards: '0',
                red_cards: '0',
                wrong_passes: '0',
                correct_passes: '0'
            })

            // Fechar modal e notificar
            onOpenChange(false)
            onPlayerAdded()
        } catch (err) {
            setError('Erro ao adicionar jogador. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

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
                                options={positions.map(p => ({ value: p, label: p }))}
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
                                id="salary"
                                label="Salário (R$)"
                                type="number"
                                step="0.01"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                required
                                placeholder="Salário"
                            />
                        </div>

                        <AddPlayerModalInput
                            id="goals_2025"
                            label="Gols em 2025"
                            type="number"
                            value={formData.goals_2025}
                            onChange={(e) => setFormData({ ...formData, goals_2025: e.target.value })}
                            min="0"
                            placeholder="Gols em 2025"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="injuries_count"
                                label="Quantidade de Lesões"
                                type="number"
                                value={formData.injuries_count}
                                onChange={(e) => setFormData({ ...formData, injuries_count: e.target.value })}
                                min="0"
                                placeholder="Lesões"
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

                        <div className="grid grid-cols-2 gap-4">
                            <AddPlayerModalInput
                                id="wrong_passes"
                                label="Passes Errados"
                                type="number"
                                value={formData.wrong_passes}
                                onChange={(e) => setFormData({ ...formData, wrong_passes: e.target.value })}
                                min="0"
                                placeholder="Passes errados"
                            />

                            <AddPlayerModalInput
                                id="correct_passes"
                                label="Passes Certos"
                                type="number"
                                value={formData.correct_passes}
                                onChange={(e) => setFormData({ ...formData, correct_passes: e.target.value })}
                                min="0"
                                placeholder="Passes certos"
                            />
                        </div>

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
