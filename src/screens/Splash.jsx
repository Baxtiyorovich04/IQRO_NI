import React from 'react';

export default function Splash() {
  return (
    <div style={styles.wrap}>
      <div style={styles.markWrap}>
        <div style={styles.mark}>
          <span style={styles.markLine1} />
          <span style={styles.markLine2} />
          <span style={styles.markLine3} />
        </div>
      </div>
      <div className="logo-word" style={styles.logo}>IQRO NI</div>
      <div style={styles.tagline}>книги в аренду · рядом с тобой</div>
      <div style={styles.dots}>
        <span style={{ ...styles.dot, animationDelay: '0s' }} />
        <span style={{ ...styles.dot, animationDelay: '0.15s' }} />
        <span style={{ ...styles.dot, animationDelay: '0.3s' }} />
      </div>
      <style>{`
        @keyframes iqro-pulse {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes iqro-grow {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrap: {
    flex: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--white)',
    gap: 18,
  },
  markWrap: { marginBottom: 4 },
  mark: {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  markLine1: {
    width: 10, height: 28, background: 'var(--green)', borderRadius: 4,
    transformOrigin: 'bottom', animation: 'iqro-grow 0.6s ease-out',
  },
  markLine2: {
    width: 10, height: 56, background: 'var(--green-dark)', borderRadius: 4,
    transformOrigin: 'bottom', animation: 'iqro-grow 0.6s ease-out 0.1s backwards',
  },
  markLine3: {
    width: 10, height: 40, background: 'var(--green)', borderRadius: 4,
    transformOrigin: 'bottom', animation: 'iqro-grow 0.6s ease-out 0.2s backwards',
  },
  logo: { fontSize: 22, color: 'var(--ink)' },
  tagline: { fontSize: 13, color: 'var(--muted)', letterSpacing: '0.02em' },
  dots: { display: 'flex', gap: 6, marginTop: 8 },
  dot: {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
    animation: 'iqro-pulse 1s ease-in-out infinite',
  },
};
