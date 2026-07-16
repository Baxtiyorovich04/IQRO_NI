import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '../i18n.js';

export default function ScanCard({ onScanSuccess, locale }) {
  const [open, setOpen] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  return (
    <>
      <motion.button
        style={styles.card}
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.97 }}
        whileHover={{ borderColor: 'var(--green)', boxShadow: '0 4px 16px rgba(0,192,75,0.14)' }}
        transition={{ duration: 0.2 }}
      >
        <div style={styles.scanIconWrap}>
          <div style={styles.corner('tl')} />
          <div style={styles.corner('tr')} />
          <div style={styles.corner('bl')} />
          <div style={styles.corner('br')} />
          <div style={styles.scanLine} />
        </div>
        <div style={styles.label}>{t(locale, 'main.scanQR')}</div>
      </motion.button>

      <AnimatePresence>
        {open && <ScannerModal onClose={() => setOpen(false)} onScanSuccess={onScanSuccess} locale={locale} />}
      </AnimatePresence>

      <style>{`
        @keyframes iqro-scanline {
          0% { top: 8%; }
          50% { top: 82%; }
          100% { top: 8%; }
        }
      `}</style>
    </>
  );
}

function ScannerModal({ onClose, onScanSuccess, locale }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('starting'); // starting | live | denied | success
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let active = true;
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (!active) {
          s.getTracks().forEach((track) => track.stop());
          return;
        }
        setStream(s);
        setStatus('live');
      } catch (error) {
        if (active) {
          setPermissionError(true);
          setStatus('denied');
        }
      }
    };

    startCamera();

    return () => {
      active = false;
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      const playPromise = videoRef.current.play?.();
      if (playPromise?.catch) playPromise.catch(() => { });
    }
  }, [stream]);

  const simulateScan = () => {
    setStatus('success');
    stream?.getTracks().forEach((t) => t.stop());
    setTimeout(() => {
      onScanSuccess?.();
      onClose();
    }, 1200);
  };

  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        style={styles.modal}
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      >
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <div style={styles.videoWrap}>
          {status === 'live' && (
            <video ref={videoRef} autoPlay playsInline muted style={styles.video} />
          )}
          {status === 'starting' && (
            <div style={styles.placeholder}>{t(locale, 'main.camera')}</div>
          )}
          {status === 'denied' && (
            <div style={styles.placeholder}>
              {t(locale, 'main.denied')}
            </div>
          )}
          {status === 'success' && (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>✓</div>
              <div>{t(locale, 'main.success')}</div>
            </div>
          )}

          {(status === 'live' || status === 'starting') && (
            <div style={styles.frame}>
              <div style={styles.corner('tl')} />
              <div style={styles.corner('tr')} />
              <div style={styles.corner('bl')} />
              <div style={styles.corner('br')} />
            </div>
          )}
        </div>

        <div style={styles.hint}>{t(locale, 'main.qrHint')}</div>

        {status === 'live' && (
          <motion.button
            style={styles.primaryBtn}
            onClick={simulateScan}
            whileTap={{ scale: 0.97 }}
          >
            {t(locale, 'main.simulate')}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

const corner = (pos) => {
  const base = { position: 'absolute', width: 20, height: 20, borderColor: 'var(--green)', borderStyle: 'solid' };
  const map = {
    tl: { top: 8, left: 8, borderWidth: '3px 0 0 3px', borderRadius: '6px 0 0 0' },
    tr: { top: 8, right: 8, borderWidth: '3px 3px 0 0', borderRadius: '0 6px 0 0' },
    bl: { bottom: 8, left: 8, borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 6px' },
    br: { bottom: 8, right: 8, borderWidth: '0 3px 3px 0', borderRadius: '0 0 6px 0' },
  };
  return { ...base, ...map[pos] };
};

const styles = {
  card: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 10, border: '1px solid var(--green-border)', borderRadius: 'var(--radius-md)',
    background: '#fff', padding: '18px 10px', height: '100%', minHeight: 174,
    boxShadow: '0 1px 2px rgba(11,31,22,0.04)',
  },
  scanIconWrap: { position: 'relative', width: 64, height: 64, background: 'var(--green-tint)', borderRadius: 10, overflow: 'hidden' },
  corner,
  scanLine: { position: 'absolute', left: '8%', right: '8%', height: 2, background: 'var(--green)', animation: 'iqro-scanline 1.8s ease-in-out infinite' },
  label: { fontSize: 12, fontWeight: 600, color: 'var(--ink)' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(11,31,22,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 20 },
  modal: { background: '#fff', borderRadius: 'var(--radius-lg)', padding: 20, width: '100%', maxWidth: 380, position: 'relative' },
  closeBtn: { position: 'absolute', top: 14, right: 14, background: '#F1F2F4', border: 'none', borderRadius: '50%', width: 30, height: 30, fontSize: 14, zIndex: 2 },
  videoWrap: { position: 'relative', width: '100%', height: 260, background: '#0B1F16', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  frame: { position: 'absolute', inset: '20%' },
  placeholder: { color: '#fff', fontSize: 13, textAlign: 'center', padding: 20, opacity: 0.85 },
  successBox: { color: '#fff', textAlign: 'center', fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 },
  successIcon: { width: 44, height: 44, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  hint: { fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 14 },
  retryBtn: { marginTop: 12, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', padding: '10px 14px', borderRadius: '999px', fontSize: 13, cursor: 'pointer' },
  primaryBtn: { width: '100%', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: 13, fontWeight: 700, fontSize: 14, marginTop: 14 },
};
