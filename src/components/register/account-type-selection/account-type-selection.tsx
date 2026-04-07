import React from 'react';
import styles from './account-type-selection.module.css';
import loginStyles from '../../../app/login/login.module.css';
import { AccountTypeCard } from '@/components/register';

interface AccountTypeSelectionProps {
    onSelectAccountType: (type: 'basic' | 'premium') => void;
}

const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelectAccountType }) => {
    return (
        <div className={loginStyles.containerLogin}>
            <div className={loginStyles.overlayEscuro} />
            <div className={loginStyles.conteudoSobreposto}>
                <div className={styles.containerSelecao}>
                    <h1 className={styles.tituloSelecao}>Selecione o Tipo de Conta</h1>
                    <div className={styles.gridPlanos}>
                        <AccountTypeCard
                            title="Conta Básica"
                            description="Acesso gratuito com recursos limitados."
                            icon={<span>👤</span>}
                            onClick={() => onSelectAccountType('basic')}
                            className={styles.cardPlano}
                            headerClassName={styles.headerPlano}
                            titleClassName={styles.tituloPlano}
                            descriptionClassName={styles.descricaoPlano}
                            iconClassName={styles.icon}
                            buttonClassName={styles.botaoEscolher}
                        />
                        <AccountTypeCard
                            title="Conta Premium"
                            description="Acesso total com todos os recursos."
                            icon={<span style={{ filter: 'hue-rotate(190deg) saturate(1.5) brightness(0.7)' }}>⭐</span>}
                            onClick={() => onSelectAccountType('premium')}
                            className={styles.cardPlano}
                            headerClassName={styles.headerPlano}
                            titleClassName={styles.tituloPlano}
                            descriptionClassName={styles.descricaoPlano}
                            iconClassName={styles.icon}
                            buttonClassName={styles.botaoEscolher}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountTypeSelection;
