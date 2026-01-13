import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { clubs, positions } from '@/lib/mock-data'
import { AddClubAthleteModalButton } from './add-club-athlete-modal-button'
import { AddClubAthleteModalInput } from './add-club-athlete-modal-input'
import styles from './add-club-athlete-modal.module.css'

interface AddClubAthleteModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddClubAthleteModal({
    open,
    onOpenChange,
}: AddClubAthleteModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        club: '',
        age: '',
        goals: '',
        injuries: '',
        yellowCards: '',
        redCards: '',
        wrongPasses: '',
        correctPasses: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const athleteData = {
                name: formData.name,
                position: formData.position,
                club: formData.club,
                age: parseInt(formData.age),
                goals: parseInt(formData.goals),
                injuries: parseInt(formData.injuries) || 0,
                yellowCards: parseInt(formData.yellowCards) || 0,
                redCards: parseInt(formData.redCards) || 0,
                wrongPasses: parseInt(formData.wrongPasses) || 0,
                correctPasses: parseInt(formData.correctPasses) || 0,
            }

            const response = await fetch('http://localhost:8000/athletes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(athleteData),
            })

            if (!response.ok) {
                throw new Error('Erro ao adicionar atleta ao elenco')
            }

            // Limpar formulário
            setFormData({
                name: '',
                position: '',
                club: '',
                age: '',
                goals: '',
                injuries: '',
                yellowCards: '',
                redCards: '',
                wrongPasses: '',
                correctPasses: '',
            })

            // Fechar modal
            onOpenChange(false)
        } catch (err) {
            console.error(err)
            setError('Erro ao adicionar atleta ao elenco. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Adicionar Atleta ao Elenco</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formGrid}>
                        <AddClubAthleteModalInput
                            field={{ id: 'name', label: 'Nome', placeholder: 'Nome completo do atleta', required: true }}
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <AddClubAthleteModalInput
                            field={{ id: 'position', label: 'Posição', placeholder: 'Selecione a posição', type: 'select', required: true }}
                            value={formData.position}
                            onChange={handleChange}
                            options={positions as any}
                        />

                        <AddClubAthleteModalInput
                            field={{ id: 'club', label: 'Clube', placeholder: 'Selecione o clube', type: 'select', required: true }}
                            value={formData.club}
                            onChange={handleChange}
                            options={clubs as any}
                        />

                        {[
                            { id: 'age', label: 'Idade', placeholder: 'Ex: 25', type: 'number', required: true },
                            { id: 'goals', label: 'Gols (2025)', placeholder: 'Ex: 10', type: 'number', required: true },
                            { id: 'injuries', label: 'Lesões', placeholder: 'Ex: 1', type: 'number' },
                            { id: 'yellowCards', label: 'Cartões Amarelos', placeholder: 'Ex: 5', type: 'number' },
                            { id: 'redCards', label: 'Cartões Vermelhos', placeholder: 'Ex: 1', type: 'number' },
                            { id: 'wrongPasses', label: 'Passes Errados', placeholder: 'Ex: 20', type: 'number' },
                            { id: 'correctPasses', label: 'Passes Certos', placeholder: 'Ex: 300', type: 'number' },
                        ].map((field) => (
                            <AddClubAthleteModalInput
                                key={field.id}
                                field={field}
                                value={(formData as any)[field.id]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.actionsContainer}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <AddClubAthleteModalButton loading={loading} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
