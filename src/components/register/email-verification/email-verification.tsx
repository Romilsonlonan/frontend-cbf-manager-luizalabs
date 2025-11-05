import React from 'react';
import styles from './email-verification.module.css';

interface EmailVerificationProps {
    email: string;
    onResend: () => void;
    onVerify: (code: string) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onResend, onVerify }) => {
    const [code, setCode] = React.useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onVerify(code);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Verify Your Email</h2>
            <p className={styles.message}>
                A verification code has been sent to <strong>{email}</strong>. Please enter the code below.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    className={styles.input}
                />
                <button type="submit" className={styles.verifyButton}>Verify</button>
            </form>
            <button onClick={onResend} className={styles.resendButton}>Resend Code</button>
        </div>
    );
};

export default EmailVerification;
