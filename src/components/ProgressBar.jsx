import React from 'react';

export default function ProgressBar({ doneKm, totalKm, maratonName, raceDate }) {
  const percent = Math.min(Math.round((doneKm / totalKm) * 100), 100);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span>{maratonName}</span>
        <span style={styles.dateText}>{raceDate}</span>
      </div>

      <div style={styles.progressContainer}>
        <div style={styles.progressBarBg}>
          <div style={{ ...styles.progressBarFill, width: `${percent}%` }}></div>
        </div>
        <div style={styles.progressLabels}>
          <span>Start 🏁</span>
          <span>{percent}% pređeno</span>
          <span>Cilj 🎯</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#1E1E1E', borderRadius: '16px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#aaa', marginBottom: '15px' },
  dateText: { color: '#00E676', fontWeight: '600' },
  progressContainer: { marginBottom: '5px' },
  progressBarBg: { backgroundColor: '#2C2C2C', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '8px' },
  progressBarFill: { backgroundColor: '#00E676', height: '100%', borderRadius: '5px', transition: 'width 0.5s ease' },
  progressLabels: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#777' }
};