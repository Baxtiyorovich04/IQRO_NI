import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import db from '../data/db.json';
import StatsBar from '../components/StatsBar.jsx';
import RentalHistoryModal from '../components/RentalHistoryModal.jsx';
import MapCard from '../components/MapCard.jsx';
import ScanCard from '../components/ScanCard.jsx';
import Faq from '../components/Faq.jsx';
import Contacts from '../components/Contacts.jsx';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Main({ profile, onLogout }) {
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState(null);

  const user = {
    ...db.user,
    firstName: profile?.firstName || db.user.firstName,
    lastName: profile?.lastName || db.user.lastName,
  };

  const handleScanSuccess = () => {
    setToast('Книга «Дюна» выдана из ячейки A1');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.div style={styles.wrap} variants={container} initial="hidden" animate="show">
      <motion.div variants={item} style={styles.topBar}>
        <span className="logo-word" style={styles.logo}>IQRO NI</span>
        <button style={styles.logoutBtn} onClick={onLogout}>Выйти</button>
      </motion.div>

      <motion.div variants={item}>
        <StatsBar user={user} onBooksClick={() => setShowHistory(true)} />
      </motion.div>

      <motion.div variants={item} style={styles.grid}>
        <MapCard machine={db.machine} />
        <ScanCard onScanSuccess={handleScanSuccess} />
      </motion.div>

      <motion.div variants={item} style={styles.section}>
        <Faq items={db.faq} />
      </motion.div>

      <motion.div variants={item} style={styles.section}>
        <Contacts contacts={db.contacts} machine={db.machine} />
      </motion.div>

      <AnimatePresence>
        {showHistory && (
          <RentalHistoryModal rentals={db.rentals} onClose={() => setShowHistory(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            style={styles.toast}
            initial={{ opacity: 0, y: 16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const styles = {
  wrap: { paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 22 },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 4px' },
  logo: { fontSize: 15, color: 'var(--green-dark)' },
  logoutBtn: { background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, textDecoration: 'underline' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 20px' },
  section: { padding: '0 20px' },
  toast: {
    position: 'fixed', bottom: 20, left: '50%',
    background: 'var(--ink)', color: '#fff', padding: '12px 18px', borderRadius: 12,
    fontSize: 13, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 70, maxWidth: '90%', textAlign: 'center',
  },
};
