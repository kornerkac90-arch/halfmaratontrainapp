import React from 'react';

export default function MenuGrid({ onSelectMenu }) {
  const menuItems = [
    {
      id: 'today',
      title: 'DANAŠNJI TRENING',
      subtitle: 'Aktivnost za danas',
      image: 'danas.jpg',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      shadowColor: 'rgba(34, 197, 94, 0.2)',
      icon: '',
      textColor: '#4ade80'
    },
    {
      id: 'currentWeek',
      title: 'TRENUTNA NEDELJA',
      subtitle: 'Pregled sedmice',
      image: 'trenutnanedelja.jpg',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      shadowColor: 'rgba(59, 130, 246, 0.2)',
      icon: '',
      textColor: '#60a5fa'
    },
    {
      id: 'plan',
      title: 'PLAN (12 NEDELJA)',
      subtitle: 'Kompletan raspored',
      image: 'plan.jpg',
      borderColor: 'rgba(234, 179, 8, 0.4)',
      shadowColor: 'rgba(234, 179, 8, 0.2)',
      icon: '',
      textColor: '#facc15'
    },
    {
      id: 'history',
      title: 'ISTORIJA',
      subtitle: 'Evidencija trčanja',
      image: 'istorija.jpg',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      shadowColor: 'rgba(168, 85, 247, 0.2)',
      icon: '',
      textColor: '#e879f9'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectMenu(item.id)}
          style={{
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.65), rgba(17, 24, 39, 0.75)), url('/${item.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${item.borderColor}`,
            borderRadius: '16px',
            padding: '8px 10px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '80px',
            boxSizing: 'border-box',
            boxShadow: `0 8px 20px ${item.shadowColor}`,
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 12px 25px ${item.shadowColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${item.shadowColor}`;
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: item.textColor,
              boxShadow: `0 0 8px ${item.textColor}`
            }}></div>
          </div>
          
          <div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: '900', 
              color: '#ffffff', 
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '2px' 
            }}>
              {item.title}
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>
              {item.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}