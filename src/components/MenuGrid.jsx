import React from 'react';

export default function MenuGrid({ onSelectMenu }) {
  const menuItems = [
    { id: 'today', title: "Današnji trening", icon: "🏃‍♀️" },
    { id: 'plan', title: "Plan (12 nedelja)", icon: "📅" },
    { id: 'history', title: "Istorija & Strava", icon: "📊" },
    { id: 'settings', title: "Podešavanja", icon: "⚙️" },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginTop: '20px',
      width: '100%'
    }}>
      {menuItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => onSelectMenu && onSelectMenu(item.id)}
          style={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: '0.2s',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4ade80'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f3f4f6' }}>{item.title}</div>
        </div>
      ))}
    </div>
  );
}