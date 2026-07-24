import React from 'react';

export default function StatsCards({ currentWeek, totalWeeks, totalKmDone, timeSpent }) {
  return (
    <div style={styles.card}>
      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Nedelja</span>
          <span style={styles.statValue}>{currentWeek} / {totalWeeks}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Kilometraža</span>
          <span style={styles.statValue}>{totalKmDone} km</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Vreme na stazi</span>
          <span style={styles.statValue}>{timeSpent}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#1E1E1E', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  statItem: { display: 'flex', flexDirection: 'column' },
  statLabel: { fontSize: '11px', color: '#888', marginBottom: '4px' },
  statValue: { fontSize: '16px', fontWeight: 'bold', color: '#fff' }
};