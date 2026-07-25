import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StatsCards from './components/StatsCards';
import MenuGrid from './components/MenuGrid';
import TrainingPlan from './components/TrainingPlan';
import TodayWorkout from './components/TodayWorkout';
import CurrentWeekView from './components/CurrentWeekView';
import HistoryView from './components/HistoryView';

const STRAVA_CLIENT_ID = '267445';
const STRAVA_CLIENT_SECRET = 'f1c6f100a8b9aa1989ef3aa281ccd8c1341e172d'; 
const REDIRECT_URI = window.location.origin;

export default function App() {
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [calculatedWeek, setCalculatedWeek] = useState(1);
  const [daysUntilStart, setDaysUntilStart] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [todayWorkoutData, setTodayWorkoutData] = useState({ title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0, dayName: "Ponedeljak" });
  
  // State za lokalnu sliku profila sa čuvanjem u localStorage
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('local_user_avatar') || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face";
  });
  
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('maraton_workout_history');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeScreen, setActiveScreen] = useState('home');

  // NOVO: Inicijalizacija master plana u localStorage-u (Korak 1)
  const [trainingPlan, setTrainingPlan] = useState(() => {
    const savedPlan = localStorage.getItem('marathon_training_plan_v2');
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
    
    // Ako nema sačuvanog plana, koristimo tvoj originalni master plan
    const initialPlan = {
      1: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (1 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km", targetKm: 8 }
      ],
      2: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 2 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 10 km @ 7:10 - 7:30 min/km", km: "10 km", targetKm: 10 }
      ],
      3: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km", targetKm: 12 }
      ],
      4: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Fartlek (Oporavak)", desc: "Fartlek (35 min): 10 min zagrijavanje + 15 min piramida (1'-1'-2'-2'-3'-3'-2'-2'-1'-1' uz 1' pauze) + 8 min rastrčavanje", km: "~5 km", targetKm: 5 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km", targetKm: 8 }
      ],
      5: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Intervali", desc: "12 min zagrijavanje + 6 x 400m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km", targetKm: 12 }
      ],
      6: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Intervali (800m)", desc: "10 min zagrijavanje + 4 x 800m (~6:00 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km", targetKm: 14 }
      ],
      7: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Intervali (500m)", desc: "12 min zagrijavanje + 6 x 500m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina (Test gelova)", desc: "Dužina 16 km @ 7:10 - 7:30 min/km (Testiranje ishrane i gelova)", km: "16 km", targetKm: 16 }
      ],
      8: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Fartlek piramida", desc: "Fartlek (42 min): 10 min zagrijavanje + piramida (1'-2'-3'-4'-3'-2'-1' uz 1' lagano) + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km", targetKm: 6 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km", targetKm: 12 }
      ],
      9: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 2 x 2 km (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~7 km", targetKm: 7 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 8 km @ 7:15 min/km + Trening snage 2/3", km: "8 km", targetKm: 8 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Generalna proba", desc: "Dužina 18 km @ 7:10 - 7:30 min/km (Generalna proba dužine)", km: "18 km", targetKm: 18 }
      ],
      10: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Kilometarski intervali", desc: "10 min zagrijavanje + 4 x 1000m (~6:00 - 6:10 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~8 km", targetKm: 8 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km", targetKm: 8 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km", targetKm: 14 }
      ],
      11: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja", km: "5 km", targetKm: 5 },
        { dayName: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 5 km (~6:30 min/km) + 10 min rastrčavanje", km: "~7 km", targetKm: 7 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km", targetKm: 8 },
        { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km", targetKm: 12 }
      ],
      12: [
        { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Utorak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Sreda", title: "Kratki intervali", desc: "10 min zagrijavanje + 3 x 1000m (~6:30 min/km) uz 2 min lagane pauze + 10 min rastrčavanje", km: "~6 km", targetKm: 6 },
        { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Petak", title: "Odmor", desc: "Odmor", km: "0 km", targetKm: 0 },
        { dayName: "Subota", title: "Dan pred trku", desc: "Lagani nadražaj: 5 km laganog trčanja @ 7:20 min/km + 3 x 100m lagana ubrzanja", km: "5 km", targetKm: 5 },
        { dayName: "Nedelja", title: "DAN UTRKE 🏅", desc: "POLUMARATON (Ljubljana - Cilj ispod 2h 30m)", km: "21.1 km", targetKm: 21.1 }
      ]
    };
    return initialPlan;
  });

  // NOVO: Efekat za čuvanje master plana pri svakoj promeni
  useEffect(() => {
    localStorage.setItem('marathon_training_plan_v2', JSON.stringify(trainingPlan));
  }, [trainingPlan]);

  // Funkcija za čitanje izabrane slike sa telefona/računara
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result);
        localStorage.setItem('local_user_avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const startDate = new Date('2026-07-27');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    
    setCurrentDateStr(today.toLocaleDateString('sr-RS', { day: 'numeric', month: 'numeric', year: 'numeric' }));

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let weekNum = 1;
    let dayIndex = 0;

    if (diffDays < 0) {
      setIsStarted(false);
      setDaysUntilStart(Math.abs(diffDays));
      weekNum = 1;
      dayIndex = 0;
    } else {
      setIsStarted(true);
      weekNum = Math.floor(diffDays / 7) + 1;
      if (weekNum > 12) weekNum = 12;
      
      const jsDay = today.getDay();
      dayIndex = jsDay === 0 ? 6 : jsDay - 1;
    }

    setCalculatedWeek(weekNum);
    // KORISTIMO ZAMENJENI STANJE PLAN
    setTodayWorkoutData(trainingPlan[weekNum][dayIndex]);

    // Provera povratka sa Strave preko URL koda
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      exchangeCodeForToken(authorizationCode);
    }

  }, [trainingPlan]); // Dodali smo trainingPlan kao zavisnost

  const connectToStrava = () => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&approval_prompt=force&scope=activity:read_all`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch(`https://www.strava.com/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code'
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('strava_access_token', data.access_token);
        window.history.replaceState({}, document.title, window.location.pathname);
        fetchAthleteActivities(data.access_token);
      } else {
        alert("Greška pri povezivanju sa Stravom.");
      }
    } catch (error) {
      console.error("Greška pri razmeni tokena:", error);
    }
  };

  const fetchAthleteActivities = async (token) => {
    try {
      const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=50`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const activities = await response.json();

      if (Array.isArray(activities)) {
        let newHistory = {};
        const planStartDate = new Date('2026-07-27');
        planStartDate.setHours(0, 0, 0, 0);

        activities.forEach(act => {
          if (act.type === 'Run' || act.sport_type === 'Run') {
            const actDateStr = act.start_date_local.split('T')[0];
            const actDate = new Date(actDateStr);
            actDate.setHours(0, 0, 0, 0);

            // Učitavamo samo ako je aktivnost od 27.07.2026. pa na dalje
            if (actDate >= planStartDate) {
              const distanceKm = Number((act.distance / 1000).toFixed(2));
              const durationSec = act.moving_time || 0;

              newHistory[actDateStr] = {
                title: act.name || "Trčanje sa Strave",
                km: distanceKm,
                seconds: durationSec,
                status: 'done'
              };
            }
          }
        });

        setWorkoutHistory(newHistory);
        alert(`Uspešno sinhronizovano sa Stravom od 27.07.2026!`);
      }
    } catch (error) {
      console.error("Greška pri preuzimanju sa Strave:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem('maraton_workout_history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const calculateTotalDoneKm = () => {
    let total = 0;
    Object.values(workoutHistory).forEach((item) => {
      if (item.status === 'done') {
        total += item.km || 0;
      }
    });
    return Number(total.toFixed(2));
  };

  const calculateTotalTimeSpent = () => {
    let totalSeconds = 0;
    Object.values(workoutHistory).forEach((item) => {
      if (item.status === 'done') {
        totalSeconds += item.seconds || 0;
      }
    });

    if (totalSeconds === 0) return "0h 00m";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
  };

  const userData = {
    name: "Mirjana",
    avatar: userAvatar,
    maraton: "Ljubljanski polumaraton",
    raceDate: "18.10.2026",
    today: currentDateStr,
    currentWeek: calculatedWeek,
    totalWeeks: 12,
    totalKmDone: calculateTotalDoneKm(), 
    totalKmTarget: 360,
    timespent: calculateTotalTimeSpent() 
  };

  return (
 <div style={{
      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.55), rgba(18, 18, 18, 0.55)), url('spoz.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 14px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Header 
          name={userData.name}
          avatar={userData.avatar}
          badgeText={isStarted ? "IDEEEMO! 🔥" : "U PRIPREMAMA ⏳"}
          onAvatarChange={handleImageChange}
        />

{activeScreen === 'today' ? (
          <TodayWorkout onBack={() => setActiveScreen('home')} />
        ) : activeScreen === 'currentWeek' ? (
          <CurrentWeekView onBack={() => setActiveScreen('home')} />
        ) : activeScreen === 'plan' ? (
          <TrainingPlan onBack={() => setActiveScreen('home')} />
        ) 
        : activeScreen === 'history' ? (
          <HistoryView 
            onBack={() => setActiveScreen('home')} 
            workoutHistory={workoutHistory} 
            masterPlan={trainingPlan} // KORISTIMO ZAMENJENI STANJE PLAN
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <ProgressBar 
                doneKm={userData.totalKmDone}
                totalKm={userData.totalKmTarget}
                maratonName={userData.maraton}
                raceDate={userData.raceDate}
              />
            </div>

            {!isStarted && (
  <div style={{
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.75), rgba(17, 24, 39, 0.75))',
    backdropFilter: 'blur(12px)',
    border: '1.5px solid rgba(34, 197, 94, 0.4)',
    borderRadius: '16px',
    padding: '8px 10px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.15)'
  }}>
    <div>
      <div style={{ 
        fontSize: '11px', 
        fontWeight: '800', 
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
        marginBottom: '2px'
      }}>
        Početak 12-nedeljnog plana:
      </div>
      <div style={{ 
        fontSize: '13px', 
        fontWeight: '900', 
        color: '#ffffff',
        letterSpacing: '0.3px'
      }}>
        27.07.2026. (Ponedeljak)
      </div>
    </div>
    
    <div style={{
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(20, 184, 166, 0.2))',
      border: '1px solid rgba(34, 197, 94, 0.6)',
      color: '#4ade80',
      padding: '6px 8px',
      borderRadius: '10px',
      fontWeight: '900',
      fontSize: '12px',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '0.4px',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
    }}>
      Još {daysUntilStart} {daysUntilStart === 1 ? 'dan' : 'dana'}!
    </div>
  </div>
)}

            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <StatsCards 
                currentWeek={userData.currentWeek}
                totalWeeks={userData.totalWeeks}
                totalKmDone={userData.totalKmDone}
                timespent={userData.timespent}
              />
            </div>

            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <MenuGrid onSelectMenu={(id) => setActiveScreen(id)} />
            </div>

      <div style={{
  background: 'linear-gradient(135deg, rgba(252, 76, 2, 0.15), rgba(31, 41, 55, 0.75))',
  backdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(252, 76, 2, 0.4)',
  borderRadius: '16px',
  padding: '10px 12px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 8px 24px rgba(252, 76, 2, 0.2)'
}}>
  <div style={{ 
    fontSize: '13px', 
    fontWeight: '900', 
    color: '#ffffff', 
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  }}>
    Poveži sa Stravom:
  </div>
  <button 
    onClick={connectToStrava}
    style={{
      background: 'linear-gradient(135deg, #fc4c02, #e34401)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      padding: '8px 14px',
      fontWeight: '900',
      fontSize: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      letterSpacing: '0.4px',
      textTransform: 'uppercase',
      boxShadow: '0 4px 14px rgba(252, 76, 2, 0.4)',
      transition: 'all 0.2s ease-in-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(252, 76, 2, 0.6)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 14px rgba(252, 76, 2, 0.4)';
    }}
  >
    ⚡ Poveži Strava
  </button>
</div>
          </div>
        )}
      </div>
    </div>
  );
}