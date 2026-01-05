import React from 'react';
import styles from './account-type-selection.module.css'; // Use the local AccountTypeSelection.module.css
import loginStyles from '../../../app/login/login.module.css'; // Import login styles for background
import { AccountTypeCard } from '@/components/register'; // Import the AccountTypeCard from the main index

interface AccountTypeSelectionProps {
    onSelectAccountType: (type: 'basic' | 'premium') => void;
}

const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelectAccountType }) => {
    return (
        <div className={loginStyles.containerLogin}> {/* Apply login page background */}
            <div className={styles.containerSelecao}> {/* Use the container for centering */}
                <h1 className={styles.tituloSelecao}>Selecione o Tipo de Conta</h1>
                <div className={styles.gridPlanos}> {/* Use grid for cards */}
                    <AccountTypeCard
                        title="Conta Básica"
                        description="Acesso gratuito com recursos limitados."
                        icon={<span>👤</span>}
                        onClick={() => onSelectAccountType('basic')}
                        className={styles.cardPlano} // Apply card styling
                        headerClassName={styles.headerPlano}
                        titleClassName={styles.tituloPlano}
                        descriptionClassName={styles.descricaoPlano}
                        iconClassName={styles.icon}
                        buttonClassName={styles.botaoEscolher}
                    />
                    <AccountTypeCard
                        title="Conta Premium"
                        description="Acesso total com todos os recursos."
                        icon={<span style={{ filter: 'hue-rotate(190deg) saturate(1.5) brightness(0.7)' }}>⭐</span>} // Estrela azul escuro
                        onClick={() => onSelectAccountType('premium')}
                        className={styles.cardPlano} // Apply card styling
                        headerClassName={styles.headerPlano}
                        titleClassName={styles.tituloPlano}
                        descriptionClassName={styles.descricaoPlano}
                        iconClassName={styles.icon}
                        buttonClassName={styles.botaoEscolher}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountTypeSelection;
