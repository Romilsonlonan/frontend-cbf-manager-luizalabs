import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload'
import styles from './add-club-modal.module.css';
import { AddClubModalButton } from './add-club-modal-button';
import { AddClubModalInput } from './add-club-modal-input';

interface AddClubModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onClubAdded: () => void
}

export function AddClubModal({ open, onOpenChange, onClubAdded }: AddClubModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        initials: '',
        city: '',
        foundation_date: '',
        br_titles: '0',
        training_center: '',
        espn_url: '' // Adicionado
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
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
            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('initials', formData.initials.toUpperCase())
            formDataToSend.append('city', formData.city)

            if (formData.foundation_date) {
                formDataToSend.append('foundation_date', formData.foundation_date)
            }

            formDataToSend.append('br_titles', formData.br_titles)

            if (formData.training_center) {
                formDataToSend.append('training_center', formData.training_center)
            }

            if (formData.espn_url) { // Adicionado
                formDataToSend.append('espn_url', formData.espn_url)
            }

            if (selectedImage) {
                formDataToSend.append('shield_image', selectedImage)
            }

            const response = await fetch('http://localhost:8000/clubs/', {
                method: 'POST',
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error('Erro ao adicionar clube')
            }

            // Limpar formulário
            setFormData({
                name: '',
                initials: '',
                city: '',
                foundation_date: '',
                br_titles: '0',
                training_center: '',
                espn_url: '' // Adicionado
            })
            setSelectedImage(null)

            // Fechar modal e notificar
            onOpenChange(false)
            onClubAdded()
        } catch (err) {
            setError('Erro ao adicionar clube. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Clube</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formField}>
                        <Label htmlFor="shield">Escudo</Label>
                        <ImageUpload
                            onImageSelect={setSelectedImage}
                            maxSizeMB={5}
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            placeholder="Nome do clube"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="initials">Sigla</Label>
                        <Input
                            id="initials"
                            placeholder="SIG"
                            value={formData.initials}
                            onChange={(e) => handleChange('initials', e.target.value.toUpperCase())}
                            required
                            maxLength={3}
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                            id="city"
                            placeholder="Cidade do clube"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="foundation_date">Data de Fundação</Label>
                        <Input
                            id="foundation_date"
                            type="date"
                            placeholder="Data de fundação"
                            value={formData.foundation_date}
                            onChange={(e) => handleChange('foundation_date', e.target.value)}
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="br_titles">Títulos Brasileiros</Label>
                        <Input
                            id="br_titles"
                            type="number"
                            placeholder="Número de títulos"
                            value={formData.br_titles}
                            onChange={(e) => handleChange('br_titles', e.target.value)}
                            min="0"
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="training_center">Centro de Treinamento</Label>
                        <Input
                            id="training_center"
                            placeholder="Nome do CT"
                            value={formData.training_center}
                            onChange={(e) => handleChange('training_center', e.target.value)}
                        />
                    </div>

                    <div className={styles.formField}>
                        <Label htmlFor="espn_url">URL da ESPN (Opcional)</Label>
                        <Input
                            id="espn_url"
                            placeholder="URL da página do clube na ESPN"
                            value={formData.espn_url}
                            onChange={(e) => handleChange('espn_url', e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className={styles.errorMessage}>{error}</p>
                    )}

                    <div className={styles.actionsContainer}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <AddClubModalButton loading={loading} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
