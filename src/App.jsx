import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './screens/Splash.jsx';
import Auth from './screens/Auth.jsx';
import Profile from './screens/Profile.jsx';
import Main from './screens/Main.jsx';

const SESSION_KEY = 'iqroni_session';
const PROFILE_KEY = 'iqroni_profile';

export default function App() {
  const [stage, setStage] = useState('splash'); // splash | auth | profile | main
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSession = localStorage.getItem(SESSION_KEY);
      const savedProfile = localStorage.getItem(PROFILE_KEY);

      if (hasSession && savedProfile) {
        setProfile(JSON.parse(savedProfile));
        setStage('main');
      } else if (hasSession) {
        setStage('profile');
      } else {
        setStage('auth');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = (phone) => {
    localStorage.setItem(SESSION_KEY, phone);
    setStage('profile');
  };

  const handleProfileDone = (data) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    setProfile(data);
    setStage('main');
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
    setStage('auth');
  };

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {stage === 'splash' && (
          <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Splash />
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
            <Auth onSuccess={handleAuthSuccess} />
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
            <Profile onDone={handleProfileDone} />
          </motion.div>
        )}
        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Main profile={profile} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
