import React from 'react';

export default function Contacts({ contacts, machine }) {
  return (
    <div>
      <h3 style={styles.heading}>Контакты</h3>
      <div style={styles.card}>
        <Row label="Адрес" value={machine.address} />
        <Row label="Телефон" value={contacts.phone} />
        <Row label="Email" value={contacts.email} />
        <Row label="Telegram" value={contacts.telegram} />
        <Row label="Instagram" value={contacts.instagram} last />
      </div>
      <div style={styles.footer}>
        <span className="logo-word" style={styles.footerLogo}>IQRO NI</span>
        <span style={styles.footerText}>© 2026 · книги в аренду · Tashkent</span>
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
  card: { border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' },
  row: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 14px', fontSize: 13 },
  rowLabel: { color: 'var(--muted)' },
  rowValue: { fontWeight: 600, textAlign: 'right' },
  footer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '28px 0 8px', color: 'var(--muted)' },
  footerLogo: { fontSize: 13, color: 'var(--green-dark)' },
  footerText: { fontSize: 11 },
};
