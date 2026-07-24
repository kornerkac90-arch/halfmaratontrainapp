import React from 'react';

export default function ProgressBar({ doneKm, totalKm, maratonName, raceDate }) {
  const startDate = new Date('2026-07-27');
  startDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let progressPercent = 0;
  if (today >= startDate) {
    progressPercent = Math.min(Math.max((doneKm / totalKm) * 100, 0), 100);
  }

  return (
    <div style={{
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '12px 15px',
      marginBottom: '15px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f3f4f6' }}>
          {maratonName}
        </span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>
          {raceDate}
        </span>
      </div>

      {/* Kontejner sa fleksibilnim rasporedom koji savršeno prati širinu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
        <span style={{ fontSize: '16px', lineHeight: '1' }}>🎯</span>

        <div style={{ flex: 1, position: 'relative', height: '14px' }}>
          <svg width="100%" height="14" viewBox="0 0 260 14" preserveAspectRatio="none" style={{ overflow: 'visible', display: 'block' }}>
            <path
              d="M 0 7 Q 65 1, 130 7 T 260 7"
              fill="none"
              stroke="#374151"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 0 7 Q 65 1, 130 7 T 260 7"
              fill="none"
              stroke="#4ade80"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="260"
              strokeDashoffset={260 - (260 * progressPercent) / 100}
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>
        </div>

        <span style={{ fontSize: '16px', lineHeight: '1' }}>🏁</span>
      </div>

      <div style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontWeight: '500', marginTop: '4px' }}>
        {Math.round(progressPercent)}% pređeno
      </div>
    </div>
  );
}