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

export default function MapCard({ machines = [], locale }) {
  const isDarkMode = document.documentElement.dataset.theme === 'dark';
  const tileUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const center = machines[0] ? [machines[0].lat, machines[0].lon] : [41.315, 69.27];
  const bounds = machines.length > 1
    ? L.latLngBounds(machines.map((machine) => [machine.lat, machine.lon]))
    : undefined;

  return (
    <motion.div
      style={styles.card}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <div style={styles.mapWrap}>
        <MapContainer
          center={center}
          bounds={bounds}
          boundsOptions={{ padding: [8, 8] }}
          zoom={12}
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          attributionControl={true}
          style={styles.map}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url={tileUrl}
            subdomains={['a', 'b', 'c', 'd']}
          />
          {machines.map((machine) => (
            <Marker key={machine.id} position={[machine.lat, machine.lon]} icon={pulseIcon}>
              <Popup>
                <div style={styles.popup}>
                  <div style={styles.popupTitle}>{machine.name}</div>
                  <div style={styles.popupAddress}>{machine.address}</div>
                  <div style={styles.popupBooksTitle}>{t(locale, 'main.availableBooks')}</div>
                  <ul style={styles.popupList}>
                    {machine.books.map((book) => (
                      <li key={`${machine.id}-${book.title}`} style={styles.popupItem}>
                        <span style={styles.popupBookTitle}>{book.title}</span>
                        <span style={styles.popupBookAuthor}>{book.author}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div style={styles.label}>
        <div style={styles.dot} />
        <span>{machines.length} {t(locale, 'main.machineCount')}</span>
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
    background: 'var(--surface)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
  },
  mapWrap: { position: 'relative', height: 164, background: 'var(--green-tint)' },
  map: { width: '100%', height: '100%', zIndex: 0 },
  popup: { minWidth: 180, display: 'flex', flexDirection: 'column', gap: 6 },
  popupTitle: { fontSize: 13, fontWeight: 700, color: 'var(--ink)' },
  popupAddress: { fontSize: 11, color: 'var(--muted)' },
  popupBooksTitle: { fontSize: 11, fontWeight: 700, color: 'var(--green-dark)', marginTop: 4 },
  popupList: { margin: 0, paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 4 },
  popupItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  popupBookTitle: { fontSize: 12, fontWeight: 600, color: 'var(--ink)' },
  popupBookAuthor: { fontSize: 11, color: 'var(--muted)' },
  label: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', fontSize: 12, fontWeight: 600 },
  dot: { width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' },
};
