import React from 'react';

export default function Header({ name, avatar, badgeText, onAvatarChange }) {
  // Funkcija koja svaku reč pretvara da počinje velikim slovom
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formattedName = capitalizeWords(name);
  const formattedPlanTitle = capitalizeWords('Ljubljana Halfmarathon');

  return (
    <>
      {/* CSS animacija za ruku koja maše */}
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(14deg); }
            40% { transform: rotate(-8deg); }
            60% { transform: rotate(14deg); }
            80% { transform: rotate(-4deg); }
            100% { transform: rotate(0deg); }
          }
          .wave-hand {
            display: inline-block;
            animation: wave 1.8s infinite;
            transform-origin: 70% 70%;
          }
        `}
      </style>

      <div style={styles.header}>
        <div style={styles.userInfo}>
          {/* Klikom na sliku otvara se izbor fajla */}
          <div style={styles.avatarWrapper}>
            <img 
              src={avatar} 
              alt="Profile" 
              style={styles.avatar} 
              title="Promeni sliku"
              onClick={() => document.getElementById('hiddenAvatarInput').click()} 
            />
          </div>
          
          {/* Skriveni input za izbor slike sa uređaja */}
          <input 
            type="file" 
            id="hiddenAvatarInput" 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={onAvatarChange}
          />

          <div>
            <div style={styles.greeting}>
              Zdravo, {formattedName}! <span className="wave-hand">👋</span>
            </div>
            <h2 style={styles.planTitle}>{formattedPlanTitle}</h2>
          </div>
        </div>

        {/* Moderni Runna bedž */}
        <div style={styles.badge}>
          🔥 Warming Up
        </div>
      </div>
    </>
  );
}

const styles = {
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '8px',
    background: 'rgba(17, 24, 39, 0.75)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(55, 65, 81, 0.6)',
    borderRadius: '16px',
    padding: '8px 12px',
    boxSizing: 'border-box',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    width: '100%'
  },
  userInfo: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px' 
  },
  avatarWrapper: {
    position: 'relative',
    cursor: 'pointer'
  },
  avatar: { 
    width: '48px', 
    height: '48px', 
    borderRadius: '50%', 
    objectFit: 'cover', 
    border: '2px solid #22c55e',
    boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)'
  },
  greeting: { 
    fontSize: '12px', 
    color: '#9ca3af',
    fontWeight: '700',
    marginBottom: '2px'
  },
  planTitle: { 
    fontSize: '15px', 
    margin: '0', 
    fontWeight: '900', 
    color: '#ffffff',
    letterSpacing: '0.4px'
  },
  badge: { 
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(20, 184, 166, 0.2))',
    border: '1px solid rgba(34, 197, 94, 0.6)',
    color: '#4ade80', 
    padding: '6px 10px', 
    borderRadius: '10px', 
    fontSize: '11px', 
    fontWeight: '900',
    letterSpacing: '0.4px',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
  }
};