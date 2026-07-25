import React from 'react';

export default function HistoryView({ onBack, workoutHistory, masterPlan }) {
  // Pretvaramo istoriju u niz i sortiramo opadajuće po datumu
  const historyEntries = Object.entries(workoutHistory).sort((a, b) => new Date(b[0]) - new Date(a[0]));

  return (
    <div style={{ width: '100%', color: '#ffffff' }}>
      {/* Zaglavlje sa dugmetom za povratak */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
        <button 
          onClick={onBack}
          style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          ← Nazad
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#4ade80' }}>
          📜 Istorija treninga
        </h2>
      </div>

      <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '15px' }}>
        12-nedeljni plan zvanično počinje <span style={{ color: '#f3f4f6', fontWeight: 'bold' }}>27.07.2026.</span> Svi završeni treninzi se automatski beleže ovde.
      </div>

      {/* Lista treninga */}
      {historyEntries.length === 0 ? (
        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          Još uvek nema zabeleženih treninga u istoriji. Plan kreće 27.07.2026!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {historyEntries.map(([dateStr, data]) => {
            // Formatiranje datuma u srpski format (npr. 27.7.2026.)
            const formattedDate = new Date(dateStr).toLocaleDateString('sr-RS', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              weekday: 'short'
            });

            return (
              <div key={dateStr} style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '12px 15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'capitalize', marginBottom: '2px' }}>
                    {formattedDate}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f3f4f6' }}>
                    {data.title}
                  </div>
                </div>
                <div style={{
                  backgroundColor: data.status === 'done' ? '#22c55e22' : '#ef444422',
                  border: `1px solid ${data.status === 'done' ? '#22c55e' : '#ef4444'}`,
                  color: data.status === 'done' ? '#4ade80' : '#f87171',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {data.km ? `${data.km} km` : 'Odmor'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}