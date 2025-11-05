import React from 'react';
import styles from './register-success.module.css';

interface RegisterSuccessProps {
    message: string;
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ message }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registration Successful!</h2>
            <p className={styles.message}>{message}</p>
            {/* Add a button to navigate to login or home */}
        </div>
    );
};

export default RegisterSuccess;
