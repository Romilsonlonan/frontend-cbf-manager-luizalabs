import React from 'react';
import Link from 'next/link';
import styles from './forgot-password-link.module.css';

export function ForgotPasswordLink() {
    return (
        <div className={styles.linkContainer}>
            <Link href="#" className={styles.link}>
                Esqueceu sua senha?
            </Link>
        </div>
    );
}
