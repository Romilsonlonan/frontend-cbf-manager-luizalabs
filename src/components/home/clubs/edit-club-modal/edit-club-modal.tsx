import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload';
import styles from './edit-club-modal.module.css';
import { ClubSimpleResponse } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

interface EditClubModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    clubToEdit: ClubSimpleResponse | null;
    onClubUpdated: () => void;
}

export function EditClubModal({ open, onOpenChange, clubToEdit, onClubUpdated }: EditClubModalProps) {
    const { toast } = useToast();
    const { token, logout } = useAuth(); // Get token and logout from AuthContext
    const [formData, setFormData] = useState({
        name: '',
        initials: '',
        city: '',
        foundation_date: '',
        br_titles: '0',
        training_center: '',
        espn_url: ''
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (clubToEdit) {
            setFormData({
                name: clubToEdit.name,
                initials: clubToEdit.initials,
                city: clubToEdit.city,
                foundation_date: clubToEdit.foundation_date || '',
                br_titles: clubToEdit.br_titles.toString(),
                training_center: clubToEdit.training_center || '',
                espn_url: clubToEdit.espn_url || ''
            });
            setSelectedImage(null); // Clear selected image on new club selection
        }
    }, [clubToEdit]);

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!clubToEdit) {
            setError('Nenhum clube selecionado para edição.');
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('initials', formData.initials.toUpperCase());
            formDataToSend.append('city', formData.city);

            if (formData.foundation_date) { // Only append if it has a value
                formDataToSend.append('foundation_date', formData.foundation_date);
            }

            formDataToSend.append('br_titles', formData.br_titles);

            if (formData.training_center) {
                formDataToSend.append('training_center', formData.training_center);
            } else {
                formDataToSend.append('training_center', ''); // Send empty string if cleared
            }

            if (formData.espn_url) {
                formDataToSend.append('espn_url', formData.espn_url);
            } else {
                formDataToSend.append('espn_url', ''); // Send empty string if cleared
            }

            if (selectedImage) {
                formDataToSend.append('shield_image', selectedImage);
            }

            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const response = await fetch(`http://localhost:8000/clubs/${clubToEdit.id}`, {
                method: 'PATCH', // Use PATCH for partial updates
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Authorization header
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    logout(); // Log out on 401
                    throw new Error('Sessão expirada. Por favor, faça login novamente.');
                }
                throw new Error('Erro ao atualizar clube');
            }

            toast({
                title: "Sucesso!",
                description: `Clube ${formData.name} atualizado com sucesso!`,
                variant: "success",
            });

            onOpenChange(false);
            onClubUpdated();
        } catch (err: any) {
            setError(err.message || 'Erro ao atualizar clube. Tente novamente.');
            toast({
                title: "Erro",
                description: err.message || "Erro ao atualizar clube.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Editar Clube</DialogTitle>
                    <DialogDescription>
                        Edite as informações do clube, incluindo o Centro de Treinamento e a URL da ESPN.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formField}>
                        <Label htmlFor="shield">Escudo</Label>
                        <ImageUpload
                            onImageSelect={setSelectedImage}
                            maxSizeMB={5}
                            initialImageUrl={clubToEdit?.shield_image_url ? `http://localhost:8000${clubToEdit.shield_image_url}` : undefined}
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
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
