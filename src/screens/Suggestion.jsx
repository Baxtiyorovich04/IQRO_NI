import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

export default function Suggestion({ machines = [], locale }) {
    const [selectedMachineId, setSelectedMachineId] = useState(machines[0]?.id || '');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const selectedMachine = machines.find((machine) => machine.id === selectedMachineId) || machines[0];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim() || !author.trim()) return;
        setSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.card}
        >
            <div style={styles.header}>
                <div style={styles.title}>{t(locale, 'main.suggestBook')}</div>
                <div style={styles.subtitle}>{t(locale, 'main.suggestionHint')}</div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    <span>{t(locale, 'main.selectMachine')}</span>
                    <select
                        value={selectedMachineId}
                        onChange={(event) => setSelectedMachineId(event.target.value)}
                        style={styles.select}
                    >
                        {machines.map((machine) => (
                            <option key={machine.id} value={machine.id}>
                                {machine.name}
                            </option>
                        ))}
                    </select>
                </label>

                {selectedMachine && (
                    <div style={styles.machineInfo}>
                        <div style={styles.machineName}>{selectedMachine.name}</div>
                        <div style={styles.machineAddress}>{selectedMachine.address}</div>
                    </div>
                )}

                <label style={styles.label}>
                    <span>{t(locale, 'main.bookTitle')}</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                            setSubmitted(false);
                        }}
                        placeholder={t(locale, 'main.bookTitlePlaceholder')}
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    <span>{t(locale, 'main.author')}</span>
                    <input
                        type="text"
                        value={author}
                        onChange={(event) => {
                            setAuthor(event.target.value);
                            setSubmitted(false);
                        }}
                        placeholder={t(locale, 'main.authorPlaceholder')}
                        style={styles.input}
                    />
                </label>

                <button type="submit" style={styles.button}>
                    {t(locale, 'main.submitSuggestion')}
                </button>
            </form>

            {submitted && (
                <div style={styles.success}>{t(locale, 'main.suggestionSuccess')}</div>
            )}
        </motion.div>
    );
}

const styles = {
    card: {
        background: 'var(--surface)',
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
    },
    header: { display: 'flex', flexDirection: 'column', gap: 4 },
    title: { fontSize: 16, fontWeight: 700, color: 'var(--ink)' },
    subtitle: { fontSize: 13, color: 'var(--muted)' },
    form: { display: 'flex', flexDirection: 'column', gap: 12 },
    label: { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--ink)' },
    input: {
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        background: 'var(--surface-soft)',
        color: 'var(--ink)',
    },
    select: {
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        background: 'var(--surface-soft)',
        color: 'var(--ink)',
    },
    machineInfo: {
        background: 'var(--green-tint)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    machineName: { fontSize: 13, fontWeight: 700, color: 'var(--green-dark)' },
    machineAddress: { fontSize: 12, color: 'var(--muted)' },
    button: {
        background: 'var(--green)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        padding: '11px 12px',
        fontWeight: 700,
    },
    success: {
        background: 'var(--green-tint)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        color: 'var(--green-dark)',
        fontSize: 13,
        fontWeight: 600,
    },
};
