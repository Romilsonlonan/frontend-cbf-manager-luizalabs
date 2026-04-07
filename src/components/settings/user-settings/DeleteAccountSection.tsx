import React, { useState } from 'react';
import styles from './DeleteAccountSection.module.css';

interface DeleteAccountSectionProps {
    onDeleteAccount: () => void | Promise<void>;
    isLoading?: boolean;
    error?: string | null;
}

const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = ({ 
    onDeleteAccount, 
    isLoading = false, 
    error = null 
}) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDeleteClick = async () => {
        // Confirmação dupla para evitar exclusões acidentais
        const confirmed = window.confirm(
            'Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão permanentemente removidos.'
        );
        
        if (confirmed) {
            setIsConfirming(true);
            try {
                await onDeleteAccount();
            } catch (err) {
                // Erro já deve ser tratado pelo componente pai
                console.error('Erro ao excluir conta:', err);
            } finally {
                setIsConfirming(false);
            }
        }
    };

    return (
        <div 
            className={styles.section} 
            data-testid="delete-account-section"
            role="region"
            aria-label="Seção de exclusão de conta"
        >
            <h2 className={styles.title}>Excluir Conta</h2>
            <p className={styles.description}>
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
            </p>
            
            {error && (
                <div 
                    className={styles.errorMessage}
                    data-testid="delete-account-error"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </div>
            )}

            <button 
                onClick={handleDeleteClick} 
                className={styles.deleteButton}
                disabled={isLoading || isConfirming}
                data-testid="delete-account-button"
                aria-label="Excluir conta permanentemente"
                aria-describedby="delete-warning"
                type="button"
            >
                {isLoading || isConfirming ? (
                    <>
                        <span className={styles.loadingSpinner} aria-hidden="true"></span>
                        Processando...
                    </>
                ) : (
                    'Excluir Conta'
                )}
            </button>
            
            <span id="delete-warning" className="sr-only">
                Aviso: Esta ação é irreversível e removerá permanentemente todos os seus dados.
            </span>
        </div>
    );
};

export default DeleteAccountSection;
