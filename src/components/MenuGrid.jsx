import React from 'react';

export default function MenuGrid() {
  return (
    <div style={styles.menuGrid}>
      <div style={styles.menuCard}>
        <span style={styles.menuIcon}>🏃‍♀️</span>
        <span style={styles.menuText}>Današnji trening</span>
      </div>
      <div style={styles.menuCard}>
        <span style={styles.menuIcon}>📅</span>
        <span style={styles.menuText}>Plan (12 nedelja)</span>
      </div>
      <div style={styles.menuCard}>
        <span style={styles.menuIcon}>📊</span>
        <span style={styles.menuText}>Istorija & Strava</span>
      </div>
      <div style={styles.menuCard}>
        <span style={styles.menuIcon}>⚙️</span>
        <span style={styles.menuText}>Podešavanja</span>
      </div>
    </div>
  );
}

const styles = {
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  menuCard: { backgroundColor: '#1E1E1E', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #2C2C2C' },
  menuIcon: { fontSize: '24px' },
  menuText: { fontSize: '14px', fontWeight: '600', color: '#ddd' }
};