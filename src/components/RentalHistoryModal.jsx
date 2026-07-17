import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

function formatDate(iso, locale) {
  const d = new Date(iso);
  const formatLocale = locale === 'en' ? 'en-US' : locale === 'uz' ? 'uz-UZ' : 'ru-RU';
  return d.toLocaleString(formatLocale, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function RentalHistoryModal({ rentals, locale, onClose }) {
  return (
    <motion.div
      style={styles.overlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div style={styles.handle} />
        <div style={styles.header}>
          <h2 style={styles.title}>{t(locale, 'main.myBooks')}</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.list}>
          {rentals.map((r, i) => (
            <motion.div
              key={r.id}
              style={styles.item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.3 }}
            >
              <div style={styles.itemTop}>
                <div style={styles.bookTitle}>{r.title}</div>
                <span style={{
                  ...styles.badge,
                  background: r.status === 'active' ? 'var(--green-tint)' : '#F1F2F4',
                  color: r.status === 'active' ? 'var(--green-dark)' : 'var(--muted)',
                }}>
                  {r.status === 'active' ? t(locale, 'main.active') : t(locale, 'main.returned')}
                </span>
              </div>
              <div style={styles.author}>{r.author}</div>
              <div style={styles.meta}>{t(locale, 'main.takenAt')} {formatDate(r.takenAt, locale)}</div>
              {r.status === 'active'
                ? <div style={styles.meta}>{t(locale, 'main.returnBy')} {formatDate(r.dueAt, locale)}</div>
                : <div style={styles.meta}>{t(locale, 'main.returnedAt')} {formatDate(r.returnedAt, locale)}</div>}
              <div style={styles.meta}>{r.location}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(11,31,22,0.45)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50,
  },
  sheet: {
    background: 'var(--surface)', color: 'var(--ink)', width: '100%', maxWidth: 480, maxHeight: '78vh', overflowY: 'auto',
    borderRadius: '24px 24px 0 0', padding: '10px 20px 28px',
  },
  handle: { width: 40, height: 4, background: 'var(--green-border)', borderRadius: 4, margin: '6px auto 14px' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  title: { fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--ink)' },
  closeBtn: { background: 'var(--surface-soft)', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 14, color: 'var(--ink)' },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  item: { border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)', padding: 14, background: 'var(--surface-soft)' },
  itemTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  bookTitle: { fontWeight: 700, fontSize: 15, color: 'var(--ink)' },
  badge: { fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, whiteSpace: 'nowrap' },
  author: { fontSize: 13, color: 'var(--muted)', marginTop: 2, marginBottom: 8 },
  meta: { fontSize: 12, color: 'var(--muted)', marginTop: 2 },
};
