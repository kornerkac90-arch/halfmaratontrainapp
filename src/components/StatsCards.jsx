import React from 'react';

const weeklyQuotes = [
  " Temelj se gradi polako, samo budi dosledna! 🚀",
  " Navika se rađa, ne preskači korake! 💪",
  " Telo se navikava, snaga polako raste! ⚡",
  " Prvi mesec je iza tebe, ritam je već tu! 🎯",
  " Ulazimo u višu brzinu, drži fokus! 🔥",
  " Polovina osnovnog dela, izdrži tempo! 🏃‍♂️",
  " Kilometraža raste, mentalna snaga još više! 🏔️",
  " Generalne probe su tu da ti daju samopouzdanje! 🏅",
  " Još malo do ciljne pravine, ne posustaj! 🌟",
  " Kreće odmor, čuvaj svežinu za dan D! 🍃",
  " Nedelja je tvoja! Ljubljana te zove, spremna si! 🏆"
];

export default function StatsCards({ currentWeek, totalWeeks, totalKmDone, timespent }) {
  const statItems = [
    {
      id: 'week',
      label: 'NEDELJA',
      value: `${currentWeek} / ${totalWeeks}`,
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15))',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      shadowColor: 'rgba(59, 130, 246, 0.2)',
      textColor: '#60a5fa'
    },
    {
      id: 'km',
      label: 'KILOMETRAŽA',
      value: `${totalKmDone} km`,
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(20, 184, 166, 0.15))',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      shadowColor: 'rgba(34, 197, 94, 0.2)',
      textColor: '#4ade80'
    },
    {
      id: 'time',
      label: 'VREME NA STAZI',
      value: timespent,
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      shadowColor: 'rgba(168, 85, 247, 0.2)',
      textColor: '#e879f9'
    }
  ];

  // Automatski bira poruku na osnovu tekuće nedelje (uzima u obzir da niz kreće od indeksa 0)
  const currentQuote = weeklyQuotes[Math.min(currentWeek - 1, weeklyQuotes.length - 1)];

  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.75)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(55, 65, 81, 0.6)',
      borderRadius: '16px',
      padding: '10px 12px',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Naslov sekcije */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '900',
          color: '#9ca3af',
          letterSpacing: '0.8px',
          textTransform: 'uppercase'
        }}>
          📊 Statistika i napredak
        </div>
      </div>

      {/* 3 kartice u gridu */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        width: '100%',
        marginBottom: '10px'
      }}>
        {statItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: item.gradient,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${item.borderColor}`,
              borderRadius: '12px',
              padding: '6px 2px',
              textAlign: 'center',
              boxShadow: `0 4px 16px ${item.shadowColor}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{
              fontSize: '10px',
              fontWeight: '800',
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '4px'
            }}>
              {item.label}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '0.3px'
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Motivaciona poruka za tekuću nedelju */}
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.35)',
        borderRadius: '12px',
        padding: '2px 6px',
        fontSize: '11px',
        color: '#4ade80',
        textAlign: 'center',
        fontWeight: '800',
        letterSpacing: '0.3px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        💡 {currentQuote}
      </div>
    </div>
  );
}