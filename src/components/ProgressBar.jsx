import React from 'react';

export default function ProgressBar({ doneKm, totalKm, maratonName, raceDate }) {
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
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          {maratonName || 'Ljubljanski polumaraton'}
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
          {/* Svetleća aktivna GPS ruta (možeš menjati dasharray ili boju) */}
          <path
            d="M 10 20 Q 50 5, 90 20 T 170 20 T 250 20 T 290 20"
            fill="none"
            stroke="url(#stravaGradient)"
            strokeWidth="5"
            strokeLinecap="round"
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
        <span style={{ color: '#60a5fa' }}>0% pređeno</span>
        <span>🏁 Cilj</span>
      </div>
    </div>
  );
}