import React, { useState } from 'react';
import styles from './ProfileImageSection.module.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileImageSectionProps {
    currentImage: string;
    onImageChange: (file: File) => Promise<void>;
    isLoading: boolean;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ currentImage, onImageChange, isLoading }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(currentImage);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onImageChange(selectedFile);
        }
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Foto de Perfil</h2>
            <div className={styles.imageContainer}>
                <img src={previewUrl} alt="Profile" className={styles.profileImage} />
                <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
                <Button onClick={handleUploadClick} disabled={!selectedFile || isLoading} className={styles.changeButton}>
                    {isLoading ? 'Enviando...' : 'Salvar Foto'}
                </Button>
            </div>
        </div>
    );
};

export default ProfileImageSection;
