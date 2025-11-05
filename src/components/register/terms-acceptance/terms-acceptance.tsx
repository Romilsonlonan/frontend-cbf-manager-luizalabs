import React from 'react';
import styles from './terms-acceptance.module.css';

interface TermsAcceptanceProps {
    onAccept: () => void;
    onDecline: () => void;
}

const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({ onAccept, onDecline }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Terms and Conditions</h2>
            <p className={styles.message}>
                Please read and accept our terms and conditions to continue with your registration.
            </p>
            {/* Placeholder for actual terms and conditions content */}
            <div className={styles.actions}>
                <button onClick={onDecline} className={styles.declineButton}>Decline</button>
                <button onClick={onAccept} className={styles.acceptButton}>Accept</button>
            </div>
        </div>
    );
};

export default TermsAcceptance;
