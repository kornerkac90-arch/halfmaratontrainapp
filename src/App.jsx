import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StatsCards from './components/StatsCards';
import MenuGrid from './components/MenuGrid';

export default function App() {
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [calculatedWeek, setCalculatedWeek] = useState(1);
  const [daysUntilStart, setDaysUntilStart] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // 1. Datum pocetka priprema: 27.07.2026.
    const startDate = new Date('2026-07-27');
    
    // 2. Trenutni datum (danas) - tretiramo ga u ponoć radi preciznog računanja dana
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    
    // Formatiranje datuma za prikaz
    setCurrentDateStr(today.toLocaleDateString('sr-RS', { day: 'numeric', month: 'numeric', year: 'numeric' }));

    // 3. Racunanje razlike
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // Pripreme jos nisu počele (odbrojavanje)
      setIsStarted(false);
      setDaysUntilStart(Math.abs(diffDays));
      setCalculatedWeek(1);
    } else {
      // Pripreme su počele!
      setIsStarted(true);
      const weekNum = Math.floor(diffDays / 7) + 1;
      setCalculatedWeek(weekNum > 12 ? 12 : weekNum);
    }
  }, []);

  const userData = {
    name: "Mirjana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    maraton: "Ljubljanski polumaraton",
    raceDate: "18.10.2026",
    today: currentDateStr,
    currentWeek: calculatedWeek,
    totalWeeks: 12,
    totalKmDone: 31,
    totalKmTarget: 360,
    timespent: "3h 45m"
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Header 
          name={userData.name}
          avatar={userData.avatar}
          badgeText={isStarted ? "IDEEEMO! 🔥" : "U PRIPREMAMA ⏳"}
        />

        {/* Dinamički baner za odbrojavanje do starta ili prikaz datuma */}
        {!isStarted ? (
          <div style={{
            background: 'linear-gradient(135deg, #1f2937, #111827)',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Početak 12-nedeljnog plana:</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f3f4f6' }}>27.07.2026. (Ponedeljak)</div>
            </div>
            <div style={{
              backgroundColor: '#22c55e22',
              border: '1px solid #22c55e',
              color: '#4ade80',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              Još {daysUntilStart} {daysUntilStart === 1 ? 'dan' : 'dana'}!
            </div>
          </div>
        ) : (
          <div style={{
            fontSize: '13px',
            color: '#888',
            textAlign: 'right',
            marginBottom: '5px'
          }}>
            Danas je: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{userData.today}</span>
          </div>
        )}

        <ProgressBar 
          doneKm={userData.totalKmDone}
          totalKm={userData.totalKmTarget}
          maratonName={userData.maraton}
          raceDate={userData.raceDate}
        />

        <StatsCards 
          currentWeek={userData.currentWeek}
          totalWeeks={userData.totalWeeks}
          totalKmDone={userData.totalKmDone}
          timespent={userData.timespent}
        />

        <MenuGrid />
      </div>
    </div>
  );
}