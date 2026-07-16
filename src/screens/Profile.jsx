import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

export default function Profile({ locale, onDone }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const canContinue = firstName.trim().length > 1 && lastName.trim().length > 1;

  const submit = () => {
    if (!canContinue) return;
    onDone({ firstName: firstName.trim(), lastName: lastName.trim() });
  };

  return (
    <motion.div
      style={styles.wrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="logo-word" style={styles.logo}>IQRO NI</div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 style={styles.title}>{t(locale, 'profile.title')}</h1>
        <p style={styles.subtitle}>{t(locale, 'profile.subtitle')}</p>
      </motion.div>

      <motion.div
        style={styles.form}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
      >
        <label style={styles.label}>{t(locale, 'profile.firstName')}</label>
        <input
          style={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t(locale, 'profile.firstNamePlaceholder')}
          autoFocus
        />

        <label style={styles.label}>{t(locale, 'profile.lastName')}</label>
        <input
          style={styles.input}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t(locale, 'profile.lastNamePlaceholder')}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />

        <motion.button
          style={{ ...styles.primaryBtn, opacity: canContinue ? 1 : 0.45 }}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          onClick={submit}
          disabled={!canContinue}
        >
          {t(locale, 'profile.continue')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  wrap: { flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '48px 24px' },
  logo: { fontSize: 18, color: 'var(--green-dark)', marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 700, margin: '0 0 4px' },
  subtitle: { fontSize: 14, color: 'var(--muted)', margin: '0 0 28px' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 },
  input: {
    border: '1.5px solid var(--green-border)', borderRadius: 'var(--radius-sm)',
    padding: '14px 16px', fontSize: 16, marginBottom: 16, background: 'var(--green-tint)',
    color: 'var(--ink)', transition: 'border-color 0.2s, box-shadow 0.2s', width: '100%',
  },
  primaryBtn: {
    background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)',
    padding: '15px', fontSize: 15, fontWeight: 700, marginTop: 8,
    transition: 'opacity 0.2s, transform 0.15s',
  },
};
