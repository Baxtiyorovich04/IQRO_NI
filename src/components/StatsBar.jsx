import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

export default function StatsBar({ user, locale, onBooksClick }) {
  return (
    <div style={styles.card}>
      <div style={styles.nameRow}>
        <div style={styles.avatar}>{user.firstName[0]}{user.lastName[0]}</div>
        <div>
          <div style={styles.name}>{user.firstName} {user.lastName}</div>
          <div style={styles.phone}>{user.phone}</div>
        </div>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statBlock}>
          <div className="logo-word" style={styles.statValue}>
            {user.balance.toLocaleString(locale === 'en' ? 'en-US' : 'ru-RU')}
          </div>
          <div style={styles.statLabel}>{t(locale, 'main.balance', { currency: user.currency })}</div>
        </div>

        <div style={styles.divider} />

        <motion.button
          style={styles.statBlockBtn}
          onClick={onBooksClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div className="logo-word" style={styles.statValue}>{user.booksInUse}</div>
          <div style={styles.statLabel}>{t(locale, 'main.books')}</div>
        </motion.button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'linear-gradient(150deg, var(--green) 0%, var(--green-dark) 100%)',
    borderRadius: 'var(--radius-lg)', padding: '20px',
    color: '#fff', margin: '0 20px', boxShadow: '0 10px 30px -8px rgba(0,171,65,0.45)',
  },
  nameRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 },
  avatar: {
    width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 15, flexShrink: 0,
  },
  name: { fontWeight: 700, fontSize: 16 },
  phone: { fontSize: 12, opacity: 0.85, marginTop: 2 },
  statsRow: { display: 'flex', alignItems: 'stretch', background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)' },
  statBlock: { flex: 1, padding: '14px 12px', textAlign: 'center' },
  statBlockBtn: {
    flex: 1, padding: '14px 12px', textAlign: 'center', background: 'transparent',
    border: 'none', color: '#fff',
  },
  divider: { width: 1, background: 'rgba(255,255,255,0.25)' },
  statValue: { fontSize: 20, lineHeight: 1.3 },
  statLabel: { fontSize: 11, opacity: 0.85, marginTop: 4 },
};
