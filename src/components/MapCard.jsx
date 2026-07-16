import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { t } from '../i18n.js';

const pulseIcon = L.divIcon({
  className: 'iqro-marker',
  html: `
    <div style="position:relative;width:22px;height:22px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:#00C04B;opacity:0.35;animation:iqro-marker-pulse 2s ease-out infinite;"></div>
      <div style="position:absolute;top:5px;left:5px;width:12px;height:12px;border-radius:50%;background:#00C04B;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function MapCard({ machine, locale }) {
  const { lat, lon } = machine;
  const bigMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;

  return (
    <motion.div
      style={styles.card}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <div style={styles.mapWrap}>
        <MapContainer
          center={[lat, lon]}
          zoom={15.5}
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          attributionControl={true}
          style={styles.map}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains={['a', 'b', 'c', 'd']}
          />
          <Marker position={[lat, lon]} icon={pulseIcon}>
            <Popup>{machine.name}</Popup>
          </Marker>
        </MapContainer>
        <a href={bigMapUrl} target="_blank" rel="noreferrer" style={styles.openBtn}>
          {t(locale, 'main.openMap')}
        </a>
      </div>
      <div style={styles.label}>
        <div style={styles.dot} />
        <span>{machine.name}</span>
      </div>

      <style>{`
        @keyframes iqro-marker-pulse {
          0% { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

const styles = {
  card: {
    display: 'block', borderRadius: 'var(--radius-md)', overflow: 'hidden',
    border: '1px solid var(--green-border)', textDecoration: 'none', color: 'var(--ink)',
    background: '#fff', boxShadow: '0 1px 2px rgba(11,31,22,0.04)',
  },
  mapWrap: { position: 'relative', height: 128, background: 'var(--green-tint)' },
  map: { width: '100%', height: '100%', zIndex: 0 },
  openBtn: {
    position: 'absolute', bottom: 8, right: 8, background: 'rgba(255,255,255,0.92)',
    color: 'var(--green-dark)', fontSize: 10, fontWeight: 700, padding: '4px 8px',
    borderRadius: 20, textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.12)', zIndex: 1,
  },
  label: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', fontSize: 12, fontWeight: 600 },
  dot: { width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' },
};
