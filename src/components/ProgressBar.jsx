import React from 'react';

export default function ProgressBar({ doneKm, totalKm, maratonName, raceDate }) {
  // Funkcija koja svaku reč pretvara da počinje velikim slovom
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formattedMaratonName = capitalizeWords(maratonName || 'Ljubljanski polumaraton');

  // Izračunavanje procenta napretka na osnovu pređenih i ukupnih kilometara
  const parsedDone = parseFloat(doneKm) || 0;
  const parsedTotal = parseFloat(totalKm) || 21.1; // Ukupno za polumaraton ili zadato
  let percentage = parsedTotal > 0 ? (parsedDone / parsedTotal) * 100 : 0;
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;

  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.75)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(55, 65, 81, 0.6)',
      borderRadius: '16px',
      padding: '6px',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '900',
          color: '#ffffff',
          letterSpacing: '0.5px'
        }}>
          {formattedMaratonName}
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          color: '#9ca3af'
        }}>
          {raceDate || '18.10.2026.'}
        </div>
      </div>

      {/* GPS Krivudava Strava linija */}
      <div style={{ width: '100%', height: '24px', position: 'relative', margin: '4px 0' }}>
        <svg viewBox="0 0 300 35" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Pozadinska (neaktivna) krivudava staza */}
          <path
            d="M 10 20 Q 50 5, 90 20 T 170 20 T 250 20 T 290 20"
            fill="none"
            stroke="rgba(55, 65, 81, 0.8)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Aktivna GPS ruta koja se dinamički popunjava preko pathLength i strokeDasharray */}
          <path
            d="M 10 20 Q 50 5, 90 20 T 170 20 T 250 20 T 290 20"
            fill="none"
            stroke="url(#stravaGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - percentage}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            filter="drop-shadow(0px 0px 6px rgba(59, 130, 246, 0.6))"
          />
          {/* Gradient definicija */}
          <defs>
            <linearGradient id="stravaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fc4c02" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        fontWeight: '800',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
        marginTop: '2px'
      }}>
        <span>🎯 Start</span>
        <span style={{ color: '#60a5fa' }}>{percentage.toFixed(1)}% pređeno</span>
        <span>🏁 Cilj</span>
      </div>
    </div>
  );
}