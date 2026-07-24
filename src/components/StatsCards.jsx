import React from 'react';

export default function StatsCards({ currentWeek, totalWeeks, totalKmDone, timespent }) {
  // Funkcija za simulaciju povezivanja sa Stravom
  const handleStravaConnect = () => {
    alert("Povezivanje sa Stravom je u fazi pripreme. Uskoro će automatski povlačiti pređene kilometre!");
  };

  return (
    <div style={{
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Naslov sekcije */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4ade80', textTransform: 'uppercase' }}>
          📊 Statistika i Napredak
        </span>
        <button 
          onClick={handleStravaConnect}
          style={{
            backgroundColor: '#fc4c02', // Strava narandžasta boja
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Poveži sa Stravom"
        >
          <span>⚡ Strava</span>
        </button>
      </div>

      {/* Grid sa 3 statistička polja */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#111827', padding: '10px 8px', borderRadius: '8px', border: '1px solid #374151' }}>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Nedelja</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#f3f4f6' }}>{currentWeek} / {totalWeeks}</div>
        </div>

        <div style={{ backgroundColor: '#111827', padding: '10px 8px', borderRadius: '8px', border: '1px solid #374151' }}>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Kilometraža</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#4ade80' }}>{totalKmDone} km</div>
        </div>

        <div style={{ backgroundColor: '#111827', padding: '10px 8px', borderRadius: '8px', border: '1px solid #374151' }}>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Vreme na stazi</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#f3f4f6' }}>{timespent}</div>
        </div>
      </div>
    </div>
  );
}