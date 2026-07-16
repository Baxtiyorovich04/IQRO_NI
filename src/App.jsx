import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdDashboard, MdSettings, MdAccountBalanceWallet, MdMenu } from 'react-icons/md';
import Splash from './screens/Splash.jsx';
import Auth from './screens/Auth.jsx';
import Profile from './screens/Profile.jsx';
import Main from './screens/Main.jsx';
import Balance from './screens/Balance.jsx';
import Settings from './screens/Settings.jsx';
import { t, defaultLocale, localeLabels, colorModes } from './i18n.js';

const SESSION_KEY = 'iqroni_session';
const PROFILE_KEY = 'iqroni_profile';
const LOCALE_KEY = 'iqroni_locale';
const THEME_KEY = 'iqroni_theme';

const localeOptions = [
  { code: 'ru', icon: '🇷🇺' },
  { code: 'uz', icon: '🇺🇿' },
  { code: 'en', icon: '🇬🇧' },
];

export default function App() {
  const [stage, setStage] = useState('splash'); // splash | auth | profile | main
  const [page, setPage] = useState('dashboard'); // dashboard | balance | settings
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [locale, setLocale] = useState(defaultLocale);
  const [theme, setTheme] = useState(colorModes.light);
  const [pendingPhone, setPendingPhone] = useState(null);

  const pageItems = [
    { key: 'dashboard', icon: <MdDashboard size={20} />, label: t(locale, 'sidebar.dashboard') },
    { key: 'balance', icon: <MdAccountBalanceWallet size={20} />, label: t(locale, 'sidebar.balance') },
    { key: 'settings', icon: <MdSettings size={20} />, label: t(locale, 'sidebar.settings') },
  ];

  const changeLanguage = () => {
    const currentIndex = localeOptions.findIndex((item) => item.code === locale);
    const nextIndex = (currentIndex + 1) % localeOptions.length;
    setLocale(localeOptions[nextIndex].code);
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY) || defaultLocale;
    const savedTheme = localStorage.getItem(THEME_KEY) || colorModes.light;
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedPhone = localStorage.getItem(SESSION_KEY);

    setLocale(savedLocale);
    setTheme(savedTheme);

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile({ ...parsedProfile, phone: parsedProfile.phone || savedPhone });
    }

    const timer = setTimeout(() => {
      const hasSession = localStorage.getItem(SESSION_KEY);
      const hasProfile = localStorage.getItem(PROFILE_KEY);

      if (hasSession && hasProfile) {
        setStage('main');
      } else if (hasSession) {
        setStage('profile');
      } else {
        setStage('auth');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const handleAuthSuccess = (phone) => {
    localStorage.setItem(SESSION_KEY, phone);
    setPendingPhone(phone);
    setStage('profile');
  };

  const handleProfileDone = (data) => {
    const fullData = { ...data, phone: pendingPhone || localStorage.getItem(SESSION_KEY) };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(fullData));
    setProfile(fullData);
    setStage('main');
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
    setPendingPhone(null);
    setStage('auth');
  };

  const toggleTheme = () => setTheme((current) => (current === colorModes.dark ? colorModes.light : colorModes.dark));

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {stage === 'splash' && (
          <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Splash locale={locale} />
          </motion.div>
        )}
        {stage === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Auth locale={locale} onSuccess={handleAuthSuccess} />
          </motion.div>
        )}
        {stage === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Profile locale={locale} onDone={handleProfileDone} />
          </motion.div>
        )}
        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={styles.mainLayout}>
              <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 84 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{
                  ...styles.sidebar,
                  ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed),
                }}
              >
                <div style={styles.sidebarHeader}>
                  <span className="logo-word" style={styles.sidebarLogo}>IQRO</span>
                </div>
                <nav style={styles.sidebarNav}>
                  {pageItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      style={{
                        ...styles.sidebarLink,
                        ...(page === item.key ? styles.sidebarLinkActive : {}),
                      }}
                      onClick={() => setPage(item.key)}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <span style={styles.sidebarIcon}>{item.icon}</span>
                    </button>
                  ))}
                </nav>
                <div style={styles.sidebarFooter}>
                  <button style={styles.logoutBtn} onClick={handleLogout}>{t(locale, 'sidebar.logout')}</button>
                </div>
              </motion.aside>

              <div style={styles.pageContainer}>
                <div style={styles.pageHeader}>
                  <button style={styles.menuToggle} onClick={() => setSidebarOpen((open) => !open)}>
                    <MdMenu size={20} />
                  </button>
                  <div style={styles.pageTitle}>{t(locale, `sidebar.${page}`)}</div>
                </div>
                <div style={styles.pageArea}>
                  {page === 'dashboard' && <Main profile={profile} locale={locale} />}
                  {page === 'balance' && <Balance locale={locale} />}
                  {page === 'settings' && (
                    <Settings
                      locale={locale}
                      theme={theme}
                      onToggleTheme={toggleTheme}
                      onChangeLanguage={changeLanguage}
                      currentLocale={locale}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  controlsWrap: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
    padding: '14px 20px 0', position: 'sticky', top: 0, zIndex: 10,
    background: 'transparent', minHeight: 44,
  },
  langGroup: {
    display: 'flex', alignItems: 'center', gap: 8,
  },
  langIcon: {
    width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--green-border)',
    background: 'var(--surface)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  langBtn: {
    width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--green-border)',
    background: 'var(--surface)', color: 'var(--ink)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  langBtnActive: {
    borderColor: 'var(--green)', background: 'var(--green-tint)',
  },
  themeBtn: {
    width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--green-border)',
    background: 'var(--surface)', color: 'var(--ink)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  mainLayout: {
    display: 'flex', gap: 16, padding: 20,
  },
  sidebar: {
    width: 130, minWidth: 130, borderRadius: 18, background: 'var(--surface)', border: '1px solid var(--green-border)', padding: 16,
    display: 'flex', flexDirection: 'column', gap: 14,
  },
  sidebarHeader: { display: 'flex', justifyContent: 'center', marginBottom: 14 },
  sidebarLogo: { fontSize: 16, color: 'var(--green-dark)', fontWeight: 700 },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' },
  sidebarLink: {
    border: 'none', background: 'transparent', padding: 12, borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', cursor: 'pointer', transition: 'background 0.2s ease, transform 0.2s ease',
    width: '100%',
  },
  sidebarLinkActive: {
    background: 'var(--green-tint)', color: 'var(--green-dark)', transform: 'scale(1.03)',
  },
  sidebarIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sidebarFooter: { marginTop: 'auto' },
  pageContainer: { flex: 1, display: 'flex', flexDirection: 'column' },
  pageHeader: { display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--green-border)', marginBottom: 14 },
  menuToggle: {
    width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--green-border)',
    background: 'var(--surface)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  pageTitle: { fontSize: 16, fontWeight: 700, color: 'var(--ink)' },
  pageArea: { flex: 1 },
  sidebarOpen: { width: 160, padding: 16 },
  sidebarClosed: { width: 0, minWidth: 0, padding: 0, overflow: 'hidden' },
};
