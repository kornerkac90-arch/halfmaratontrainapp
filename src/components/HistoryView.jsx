import React, { useState, useEffect } from 'react';

export default function HistoryView({ onBack, workoutHistory, masterPlan }) {
  const [historyData, setHistoryData] = useState(workoutHistory);
  const [expandedId, setExpandedId] = useState(null); // NOVO: Praćenje šta je kliknuto

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

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return '--:--';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s}s`;
  };

  const handleDelete = (dateKey, e) => {
    e.stopPropagation(); // Sprečava otvaranje kartice kad klikneš na kantu
    if (window.confirm('Da li sigurno želiš da obrišeš ovaj trening iz istorije? Urađeni kilometri će biti umanjeni.')) {
      const saved = JSON.parse(localStorage.getItem('completed_workouts') || '{}');
      delete saved[dateKey];
      
      localStorage.setItem('completed_workouts', JSON.stringify(saved));
      setHistoryData(saved);
      
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('workout_updated'));
    }
  };

  const toggleExpand = (dateStr) => {
    setExpandedId(expandedId === dateStr ? null : dateStr);
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
        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', lineHeight: '1.4' }}>Svi završeni treninzi i analize ritma se beleže ovde. <strong>Klikni na trening za detalje!</strong></p>
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
            const isExpanded = expandedId === dateStr;

            return (
              <div 
                key={dateStr} 
                onClick={() => toggleExpand(dateStr)}
                style={{ 
                  backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.94)), url('/trenutnanedelja.jpg')`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  backdropFilter: 'blur(10px)', 
                  border: isExpanded ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '14px', 
                  padding: '12px 14px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px', 
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isExpanded ? '0 8px 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(34, 197, 94, 0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'capitalize', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {/* Animacija strelice */}
                      <span style={{ fontSize: '9px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                      {formattedDate} 
                      {data.week && data.dayIndex !== undefined && <span style={{color: '#60a5fa'}}>(Nedelja {data.week})</span>}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: '#ffffff', letterSpacing: '0.3px', maxWidth: '180px', wordWrap: 'break-word' }}>
                      {capitalizeWords(data.title)}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: isDone ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`, color: isDone ? '#4ade80' : '#f87171', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900' }}>
                      {data.km ? (String(data.km).includes('km') ? data.km : `${data.km} km`) : 'Odmor'}
                    </div>
                    <button 
                      onClick={(e) => handleDelete(dateStr, e)}
                      title="Obriši ovaj trening"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', borderRadius: '8px', width: '26px', height: '26px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '12px' }}
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

                {/* PRO DETALJI KOJI SE OTVARAJU NA KLIK */}
                {isExpanded && (
                  <div style={{
                    marginTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '12px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}>
                    {data.isStrava ? (
                      <>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>⏱️ Vreme</div>
                          <div style={{ fontSize: '14px', color: '#fff', fontWeight: '900' }}>{formatTime(data.seconds)}</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>👟 Tempo</div>
                          <div style={{ fontSize: '14px', color: '#4ade80', fontWeight: '900' }}>{data.pace ? `${data.pace} /km` : '--'}</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>❤️ Puls</div>
                          <div style={{ fontSize: '14px', color: '#f87171', fontWeight: '900' }}>{data.hr ? `${data.hr} bpm` : 'N/A'}</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>⛰️ Uspon</div>
                          <div style={{ fontSize: '14px', color: '#60a5fa', fontWeight: '900' }}>{data.elevation !== undefined ? `${data.elevation} m` : '0 m'}</div>
                        </div>
                      </>
                    ) : (
                      <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '16px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>
                          Ovaj trening je unet ručno. Za naprednu analitiku ritma i pulsa, povežite ga sa Stravom.
                        </span>
                      </div>
                    )}
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