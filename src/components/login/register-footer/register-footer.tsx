import React from 'react';
import Link from 'next/link';
import styles from './register-footer.module.css';

interface RegisterFooterProps {
    text: string;
    linkText: string;
    href: string;
}

export function RegisterFooter({ text, linkText, href }: RegisterFooterProps) {
    return (
        <p className={styles.footerText}>
            {text}{' '}
            <Link href={href} className={styles.footerLink}>
                {linkText}
            </Link>
        </p>
    );
}
