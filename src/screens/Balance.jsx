import React, { useState } from 'react';
import { motion } from 'framer-motion';
import db from '../data/db.json';
import { t } from '../i18n.js';

export default function Balance({ locale }) {
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState('');

    const deposit = () => {
        const value = Number(amount.replace(/\D/g, ''));
        if (!value || value <= 0) return;
        setSuccess(t(locale, 'balance.successMessage', { amount: value.toLocaleString(locale === 'en' ? 'en-US' : 'ru-RU'), currency: db.user.currency }));
        setAmount('');
    };

    return (
        <motion.div
            style={styles.wrap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 style={styles.title}>{t(locale, 'balance.title')}</h1>
            <p style={styles.subtitle}>{t(locale, 'balance.subtitle')}</p>

            <div style={styles.card}>
                <div style={styles.row}>
                    <span>{t(locale, 'balance.currentBalance')}</span>
                    <strong>{db.user.balance.toLocaleString(locale === 'en' ? 'en-US' : 'ru-RU')} {db.user.currency}</strong>
                </div>

                <label style={styles.label}>{t(locale, 'balance.amountPlaceholder')}</label>
                <input
                    style={styles.input}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t(locale, 'balance.amountPlaceholder')}
                    inputMode="numeric"
                />

                <button style={styles.primaryBtn} onClick={deposit}>{t(locale, 'balance.submit')}</button>
                {success && <div style={styles.success}>{success}</div>}
            </div>
        </motion.div>
    );
}

const styles = {
    wrap: { padding: 20, display: 'flex', flexDirection: 'column', gap: 14 },
    title: { fontSize: 22, margin: 0 },
    subtitle: { fontSize: 14, color: 'var(--muted)', margin: 0 },
    card: {
        marginTop: 20, background: 'var(--surface)', border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)', padding: 18,
        display: 'flex', flexDirection: 'column', gap: 12.5,
    },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 14 },
    label: { fontSize: 12, color: 'var(--muted)' },
    input: {
        border: '1px solid var(--green-border)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', fontSize: 15,
        background: 'var(--surface-soft)', color: 'var(--ink)', width: '100%',
    },
    primaryBtn: {
        border: 'none', borderRadius: 'var(--radius-sm)', padding: '14px', background: 'var(--green)', color: '#fff', fontWeight: 700,
    },
    success: { fontSize: 13, color: 'var(--green-dark)', marginTop: 10 },
};
