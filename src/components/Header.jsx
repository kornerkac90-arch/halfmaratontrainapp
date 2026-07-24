import React from 'react';

export default function Header({ name, avatar, badgeText, onAvatarChange }) {
  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        {/* Klikom na sliku otvara se izbor fajla */}
        <img 
          src={avatar} 
          alt="Profile" 
          style={{ ...styles.avatar, cursor: 'pointer' }} 
          title="Promeni sliku"
          onClick={() => document.getElementById('hiddenAvatarInput').click()} 
        />
        
        {/* Skriveni input za izbor slike sa uređaja */}
        <input 
          type="file" 
          id="hiddenAvatarInput" 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={onAvatarChange}
        />

        <div>
          <span style={styles.greeting}>Zdravo, {name}! 👋</span>
          <h2 style={styles.planTitle}>Ljubljana Marathon</h2>
        </div>
      </div>
      <div style={styles.badge}>{badgeText}</div>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00E676' },
  greeting: { fontSize: '14px', color: '#888' },
  planTitle: { fontSize: '18px', margin: '0', fontWeight: 'bold', color: '#fff' },
  badge: { backgroundColor: '#00E676', color: '#000', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }
};