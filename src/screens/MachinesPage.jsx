import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLocationOn, MdOpenInNew } from 'react-icons/md';

export default function MachinesPage({ machines = [], locale }) {
    const [selectedMachineId, setSelectedMachineId] = useState(machines[0]?.id || '');

    const selectedMachine = machines.find((machine) => machine.id === selectedMachineId) || machines[0];
    const mapUrl = selectedMachine
        ? `https://www.openstreetmap.org/?mlat=${selectedMachine.lat}&mlon=${selectedMachine.lon}#map=16/${selectedMachine.lat}/${selectedMachine.lon}`
        : '';

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={styles.wrap}>
            <div style={styles.header}>
                <div style={styles.title}>Machines</div>
                <div style={styles.subtitle}>Tap a location to see available books and directions.</div>
            </div>

            <div style={styles.list}>
                {machines.map((machine) => (
                    <button
                        key={machine.id}
                        type="button"
                        onClick={() => setSelectedMachineId(machine.id)}
                        style={{
                            ...styles.item,
                            ...(selectedMachineId === machine.id ? styles.itemActive : {}),
                        }}
                    >
                        <div style={styles.itemTop}>
                            <div style={styles.itemName}>{machine.name}</div>
                            <MdLocationOn size={18} color="var(--green-dark)" />
                        </div>
                        <div style={styles.itemAddress}>{machine.address}</div>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selectedMachine && (
                    <motion.div
                        key={selectedMachine.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={styles.detailCard}
                    >
                        <div style={styles.detailHeader}>
                            <div style={styles.detailTitle}>{selectedMachine.name}</div>
                            <a href={mapUrl} target="_blank" rel="noreferrer" style={styles.linkButton}>
                                <MdOpenInNew size={14} />
                                <span>Open map</span>
                            </a>
                        </div>

                        <div style={styles.sectionTitle}>Books available</div>
                        <div style={styles.bookList}>
                            {selectedMachine.books.map((book) => (
                                <div key={`${selectedMachine.id}-${book.title}`} style={styles.bookItem}>
                                    <div style={styles.bookTitle}>{book.title}</div>
                                    <div style={styles.bookAuthor}>{book.author}</div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.sectionTitle}>Directions</div>
                        <div style={styles.directionText}>{selectedMachine.address}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const styles = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    header: { display: 'flex', flexDirection: 'column', gap: 4 },
    title: { fontSize: 16, fontWeight: 700, color: 'var(--ink)' },
    subtitle: { fontSize: 13, color: 'var(--muted)' },
    list: { display: 'flex', flexDirection: 'column', gap: 8 },
    item: {
        background: 'var(--surface)',
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        textAlign: 'left',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    itemActive: {
        borderColor: 'var(--green)',
        background: 'var(--green-tint)',
    },
    itemTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
    itemName: { fontWeight: 700, fontSize: 14 },
    itemAddress: { fontSize: 12, color: 'var(--muted)' },
    detailCard: {
        background: 'var(--surface)',
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
    detailTitle: { fontSize: 15, fontWeight: 700, color: 'var(--ink)' },
    linkButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'var(--green-tint)',
        color: 'var(--green-dark)',
        borderRadius: 999,
        padding: '6px 10px',
        textDecoration: 'none',
        fontSize: 12,
        fontWeight: 700,
    },
    sectionTitle: { fontSize: 12, fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' },
    bookList: { display: 'flex', flexDirection: 'column', gap: 8 },
    bookItem: {
        border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 10px',
        background: 'var(--surface-soft)',
    },
    bookTitle: { fontSize: 13, fontWeight: 700, color: 'var(--ink)' },
    bookAuthor: { fontSize: 12, color: 'var(--muted)', marginTop: 2 },
    directionText: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 },
};
