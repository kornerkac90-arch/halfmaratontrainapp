import React from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StatsCards from './components/StatsCards';
import MenuGrid from './components/MenuGrid';

export default function App() {
  // Podaci koje ćemo kasnije vući iz Firebase-a
  const userData = {
    name: "Mirjana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    maraton: "Ljubljanski polumaraton",
    raceDate: "18.10.2026",
    currentWeek: 3,
    totalWeeks: 12,
    totalKmDone: 31,
    totalKmTarget: 360,
    timeSpent: "3h 45m"
  };

  return (
    <div style={styles.container}>
      <Header 
        name={userData.name} 
        avatar={userData.avatar} 
        badgeText="IDEEEEMO! 🔥" 
      />
      
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
        timeSpent={userData.timeSpent} 
      />

      <MenuGrid />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '480px',
    margin: '0 auto',
  }
};