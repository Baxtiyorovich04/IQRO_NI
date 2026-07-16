import React from 'react';
import { t } from '../i18n.js';

export default function Contacts({ contacts, machine, locale }) {
  return (
    <div>
      <h3 style={styles.heading}>{t(locale, 'main.contacts')}</h3>
      <div style={styles.card}>
        <Row label={t(locale, 'main.address')} value={machine.address} />
        <Row label={t(locale, 'main.phone')} value={contacts.phone} />
        <Row label={t(locale, 'main.email')} value={contacts.email} />
        <Row label={t(locale, 'main.telegram')} value={contacts.telegram} />
        <Row label={t(locale, 'main.instagram')} value={contacts.instagram} last />
      </div>
      <div style={styles.footer}>
        <span className="logo-word" style={styles.footerLogo}>IQRO NI</span>
        <span style={styles.footerText}>{t(locale, 'main.contactsFooter')}</span>
      </div>
    </div>
  );
}

function Row({ label, value, last }) {
  return (
    <div style={{ ...styles.row, borderBottom: last ? 'none' : '1px solid var(--green-border)' }}>
      <span style={styles.rowLabel}>{label}</span>
      <span style={styles.rowValue}>{value}</span>
    </div>
  );
}

const styles = {
  heading: { fontSize: 15, fontWeight: 700, margin: '0 0 10px' },
  card: { border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface)' },
  row: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 14px', fontSize: 13 },
  rowLabel: { color: 'var(--muted)' },
  rowValue: { fontWeight: 600, textAlign: 'right' },
  footer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '28px 0 8px', color: 'var(--muted)' },
  footerLogo: { fontSize: 13, color: 'var(--green-dark)' },
  footerText: { fontSize: 11 },
};
