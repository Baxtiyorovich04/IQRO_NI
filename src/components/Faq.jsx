import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '../i18n.js';

export default function Faq({ items, locale }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <h3 style={styles.heading}>{t(locale, 'faq.heading')}</h3>
      <div style={styles.list}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ ...styles.item, borderColor: isOpen ? 'var(--green)' : 'var(--green-border)' }}>
              <button style={styles.q} onClick={() => setOpenIndex(isOpen ? null : i)}>
                <span>{item.q}</span>
                <motion.span
                  style={styles.chevron}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={styles.a}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  heading: { fontSize: 15, fontWeight: 700, margin: '0 0 10px' },
  list: { display: 'flex', flexDirection: 'column', gap: 8 },
  item: { border: '1px solid var(--green-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', transition: 'border-color 0.25s', background: 'var(--surface)' },
  q: {
    width: '100%', background: 'var(--surface)', border: 'none', padding: '13px 14px', textAlign: 'left',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 600,
    color: 'var(--ink)',
  },
  chevron: { color: 'var(--green)', fontSize: 18, flexShrink: 0, marginLeft: 10, display: 'inline-block' },
  a: { padding: '0 14px 14px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 },
};
