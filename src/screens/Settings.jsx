import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

export default function Settings({ locale, theme, onToggleTheme, onChangeLanguage, currentLocale }) {
    return (
        <motion.div
            style={styles.wrap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 style={styles.title}>{t(locale, 'settings.title')}</h1>
            <p style={styles.subtitle}>{t(locale, 'settings.subtitle')}</p>

            <div style={styles.card}>
                <div style={styles.settingRow}>
                    <div>
                        <div style={styles.settingTitle}>{t(locale, 'settings.theme')}</div>
                        <div style={styles.settingDescription}>{t(locale, 'settings.themeDescription')}</div>
                    </div>
                    <button style={styles.toggleBtn} onClick={onToggleTheme}>
                        {theme === 'dark' ? t(locale, 'settings.lightMode') : t(locale, 'settings.darkMode')}
                    </button>
                </div>

                <div style={styles.settingRow}>
                    <div>
                        <div style={styles.settingTitle}>{t(locale, 'settings.language')}</div>
                        <div style={styles.settingDescription}>{t(locale, 'settings.languageDescription')}</div>
                    </div>
                    <button style={styles.toggleBtn} onClick={onChangeLanguage}>
                        {currentLocale.toUpperCase()}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

const styles = {
    wrap: { padding: 20, display: 'flex', flexDirection: 'column', gap: 14 },
    title: { fontSize: 22, margin: 0 },
    subtitle: { fontSize: 14, color: 'var(--muted)', margin: 0 },
    card: { marginTop: 20, background: 'var(--surface)', border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)', padding: 18, display: 'flex', flexDirection: 'column', gap: 16 },
    settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    settingTitle: { fontSize: 14, fontWeight: 700 },
    settingDescription: { fontSize: 12, color: 'var(--muted)' },
    toggleBtn: { minWidth: 100, border: '1px solid var(--green-border)', borderRadius: '999px', background: 'var(--surface)', color: 'var(--ink)', padding: '10px 14px' },
};
