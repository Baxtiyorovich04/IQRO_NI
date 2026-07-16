import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth({ onSuccess }) {
  const [phone, setPhone] = useState('+998 ');
  const [step, setStep] = useState('phone'); // phone | code
  const [demoCode, setDemoCode] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const sendCode = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 12) {
      setError('Введите номер полностью');
      return;
    }
    setError('');
    const generated = String(Math.floor(1000 + Math.random() * 9000));
    setDemoCode(generated);
    setStep('code');
  };

  const verifyCode = () => {
    if (code === demoCode) {
      onSuccess(phone);
    } else {
      setError('Неверный код, попробуйте ещё раз');
    }
  };

  return (
    <div style={styles.wrap}>
      <div className="logo-word" style={styles.logo}>IQRO NI</div>

      <AnimatePresence mode="wait">
        {step === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 style={styles.title}>Вход по номеру телефона</h1>
            <p style={styles.subtitle}>Пришлём код подтверждения</p>

            <label style={styles.label}>Номер телефона</label>
            <input
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              inputMode="tel"
              autoFocus
            />
            {error && <div style={styles.error}>{error}</div>}

            <motion.button style={styles.primaryBtn} whileTap={{ scale: 0.97 }} onClick={sendCode}>
              Получить код
            </motion.button>
          </motion.div>
        )}

        {step === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 style={styles.title}>Введите код</h1>
            <p style={styles.subtitle}>Отправлен на {phone}</p>

            <div style={styles.demoBanner}>
              Демо-режим (нет SMS-провайдера): ваш код — <b>{demoCode}</b>
            </div>

            <label style={styles.label}>Код из 4 цифр</label>
            <input
              style={{ ...styles.input, letterSpacing: '0.5em', fontSize: 20, textAlign: 'center' }}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="0000"
              inputMode="numeric"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
            />
            {error && <div style={styles.error}>{error}</div>}

            <motion.button
              style={{ ...styles.primaryBtn, opacity: code.length < 4 ? 0.5 : 1 }}
              whileTap={code.length >= 4 ? { scale: 0.97 } : {}}
              onClick={verifyCode}
              disabled={code.length < 4}
            >
              Подтвердить
            </motion.button>
            <button style={styles.linkBtn} onClick={() => { setStep('phone'); setCode(''); setError(''); }}>
              Изменить номер
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  wrap: {
    flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column',
    padding: '48px 24px', gap: 6,
  },
  logo: { fontSize: 18, color: 'var(--green-dark)', marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 700, margin: '0 0 4px' },
  subtitle: { fontSize: 14, color: 'var(--muted)', margin: '0 0 28px' },
  label: { fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 600 },
  input: {
    border: '1.5px solid var(--green-border)', borderRadius: 'var(--radius-sm)',
    padding: '14px 16px', fontSize: 16, marginBottom: 14, background: 'var(--green-tint)',
    color: 'var(--ink)', width: '100%',
  },
  error: { color: '#D14343', fontSize: 13, marginBottom: 10 },
  primaryBtn: {
    background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)',
    padding: '15px', fontSize: 15, fontWeight: 700, marginTop: 8, width: '100%',
  },
  linkBtn: {
    background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 13,
    marginTop: 14, textDecoration: 'underline',
  },
  demoBanner: {
    background: 'var(--green-tint)', border: '1px dashed var(--green)', borderRadius: 'var(--radius-sm)',
    padding: '10px 12px', fontSize: 13, color: 'var(--ink)', marginBottom: 20,
  },
};
