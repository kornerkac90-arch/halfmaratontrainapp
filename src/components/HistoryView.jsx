import React, { useState, useEffect } from 'react';

export default function HistoryView({ onBack, workoutHistory, masterPlan }) {
  const [historyData, setHistoryData] = useState(workoutHistory);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('completed_workouts');
      if (saved) {
        setHistoryData(JSON.parse(saved));
      } else {
        setHistoryData({});
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('workout_updated', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('workout_updated', handleStorageChange);
    };
  }, []);

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // FUNKCIJA ZA BRISANJE
  const handleDelete = (dateKey) => {
    if (window.confirm('Da li sigurno želiš da obrišeš ovaj trening iz istorije? Urađeni kilometri će biti umanjeni.')) {
      const saved = JSON.parse(localStorage.getItem('completed_workouts') || '{}');
      delete saved[dateKey]; // Brišemo unos za taj datum
      
      localStorage.setItem('completed_workouts', JSON.stringify(saved));
      setHistoryData(saved); // Osvežavamo lokalni state
      
      // Obaveštavamo App.jsx da ponovo preračuna progres
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('workout_updated'));
    }
  };

  const historyEntries = Object.entries(historyData || {}).filter(([dateStr]) => {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }).sort((a, b) => new Date(b[0]) - new Date(a[0]));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box', color: '#ffffff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
        <button onClick={onBack} style={{ background: 'rgba(31, 41, 55, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>← Nazad</button>
        <div style={{ fontSize: '11px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Arhiva</div>
      </div>

      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>Istorija treninga</h2>
        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', lineHeight: '1.4' }}>Svi završeni treninzi i analize ritma se beleže ovde.</p>
      </div>

      {historyEntries.length === 0 ? (
        <div style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.94)), url('/trenutnanedelja.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '24px 16px', textAlign: 'center', color: '#9ca3af', fontSize: '12px', fontWeight: '600' }}>
          Još uvek nema zabeleženih treninga u istoriji. Plan kreće 27.07.2026!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {historyEntries.map(([dateStr, data]) => {
            const formattedDate = new Date(dateStr).toLocaleDateString('sr-RS', { day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'short' });
            const isDone = data.status === 'done' || data.status === 'completed';

            return (
              <div key={dateStr} style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.94)), url('/trenutnanedelja.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'capitalize', fontWeight: '700' }}>
                      {formattedDate} 
                      {data.week && data.dayIndex !== undefined && <span style={{color: '#60a5fa', marginLeft: '6px'}}>(Nedelja {data.week})</span>}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: '#ffffff', letterSpacing: '0.3px', maxWidth: '180px', wordWrap: 'break-word' }}>{capitalizeWords(data.title)}</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: isDone ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`, color: isDone ? '#4ade80' : '#f87171', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900' }}>
                      {data.km ? (String(data.km).includes('km') ? data.km : `${data.km} km`) : 'Odmor'}
                    </div>
                    {/* DUGME ZA BRISANJE */}
                    <button 
                      onClick={() => handleDelete(dateStr)}
                      title="Obriši ovaj trening"
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#f87171',
                        borderRadius: '8px',
                        width: '26px',
                        height: '26px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {data.feedback && (
                  <div style={{ fontSize: '11px', fontWeight: '800', color: data.feedback.includes('🟢') ? '#4ade80' : data.feedback.includes('🔴') ? '#f87171' : '#60a5fa', background: 'rgba(31, 41, 55, 0.6)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    {data.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}