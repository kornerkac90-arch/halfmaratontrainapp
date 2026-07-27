import React, { useState } from 'react';

export default function TodayWorkout({ onBack, onUpdateStatus }) {
  const [modalInfo, setModalInfo] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    type: 'success', 
    showNextOptions: false 
  });

  const startDate = new Date('2026-07-27');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let currentWeekNum = 1;
  let dayOfWeekIndex = 0; 

  if (diffDays >= 0) {
    currentWeekNum = Math.floor(diffDays / 7) + 1;
    if (currentWeekNum > 12) currentWeekNum = 12;
    const jsDay = today.getDay();
    dayOfWeekIndex = jsDay === 0 ? 6 : jsDay - 1;
  }

  const rawMasterPlan = {
    1: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (1 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km" }
    ],
    2: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 2 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 10 km @ 7:10 - 7:30 min/km", km: "10 km" }
    ],
    3: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    4: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Fartlek (Oporavak)", desc: "Fartlek (35 min): 10 min zagrijavanje + 15 min piramida (1'-1'-2'-2'-3'-3'-2'-2'-1'-1' uz 1' pauze) + 8 min rastrčavanje", km: "~5 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km" }
    ],
    5: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Intervali", desc: "12 min zagrijavanje + 6 x 400m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    6: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Intervali (800m)", desc: "10 min zagrijavanje + 4 x 800m (~6:00 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km" }
    ],
    7: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Intervali (500m)", desc: "12 min zagrijavanje + 6 x 500m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina (Test gelova)", desc: "Dužina 16 km @ 7:10 - 7:30 min/km (Testiranje ishrane i gelova)", km: "16 km" }
    ],
    8: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Fartlek piramida", desc: "Fartlek (42 min): 10 min zagrijavanje + piramida (1'-2'-3'-4'-3'-2'-1' uz 1' lagano) + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    9: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 2 x 2 km (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~7 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 8 km @ 7:15 min/km + Trening snage 2/3", km: "8 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Generalna proba", desc: "Dužina 18 km @ 7:10 - 7:30 min/km (Generalna proba dužine)", km: "18 km" }
    ],
    10: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { day: "Sreda", title: "Kilometarski intervali", desc: "10 min zagrijavanje + 4 x 1000m (~6:00 - 6:10 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~8 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km" }
    ],
    11: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Lagano trčanje + Ubrzanja", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja", km: "5 km" },
      { day: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 5 km (~6:30 min/km) + 10 min rastrčavanje", km: "~7 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km" },
      { day: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    12: [
      { day: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Utorak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Sreda", title: "Kratki intervali", desc: "10 min zagrijavanje + 3 x 1000m (~6:30 min/km) uz 2 min lagane pauze + 10 min rastrčavanje", km: "~6 km" },
      { day: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Petak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { day: "Subota", title: "Dan pred trku", desc: "Lagani nadražaj: 5 km laganog trčanja @ 7:20 min/km + 3 x 100m lagana ubrzanja", km: "5 km" },
      { day: "Nedelja", title: "DAN UTRKE", desc: "POLUMARATON (Ljubljana - Cilj ispod 2h 30m)", km: "21.1 km" }
    ]
  };

  // Dodajemo week i dayIndex SVAKOM treningu da uvek znamo njegov ID
  const masterPlan = {};
  for (let w = 1; w <= 12; w++) {
    masterPlan[w] = rawMasterPlan[w].map((wk, dIdx) => ({
      ...wk,
      week: w,
      dayIndex: dIdx
    }));
  }

  const existingHistory = JSON.parse(localStorage.getItem('completed_workouts') || '{}');
  const historyValsForCheck = Object.values(existingHistory);
  const isWorkoutDone = (wObj) => historyValsForCheck.some(h => h.week === wObj.week && h.dayIndex === wObj.dayIndex && h.status === 'done');

  const savedMovedWorkout = localStorage.getItem('current_today_workout');
  const forcedWorkout = savedMovedWorkout ? JSON.parse(savedMovedWorkout) : null;
  const scheduledTodayWorkout = masterPlan[currentWeekNum] ? masterPlan[currentWeekNum][dayOfWeekIndex] : masterPlan[1][0];
  
  // PAMETNA LOGIKA: Rešavanje onoga "aplikacija se fiksirala za datum"
  let resolvedWorkout = forcedWorkout;
  
  if (!resolvedWorkout) {
    if (isWorkoutDone(scheduledTodayWorkout)) {
      // Ako je današnji odrađen (jer je prebačen ranije), nađi sledeći u nedelji!
      let foundNext = false;
      for (let i = dayOfWeekIndex + 1; i < 7; i++) {
        const nextInLine = masterPlan[currentWeekNum][i];
        if (!isWorkoutDone(nextInLine)) {
          resolvedWorkout = nextInLine;
          foundNext = true;
          break;
        }
      }
      if (!foundNext) resolvedWorkout = scheduledTodayWorkout; // Svi odradjeni
    } else {
      resolvedWorkout = scheduledTodayWorkout;
    }
  }

  const todayWorkout = resolvedWorkout;
  const isCurrentlyDone = isWorkoutDone(todayWorkout); // Zastavica da li je ovaj koji gledamo gotov

  const handleAction = (status) => {
    if (status === 'moved' && todayWorkout.dayIndex === 6 && !forcedWorkout) {
      setModalInfo({
        isOpen: true,
        title: "Greška",
        message: "Nije moguće pomeriti trening jer je danas nedelja – prelazak u narednu nedelju nije dozvoljen!",
        type: "error",
        showNextOptions: false
      });
      return;
    }

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const existingEntry = existingHistory[dateKey] || {};

    if (status === 'completed') {
      const numericKm = parseFloat(todayWorkout.km) || 0;
      
      // SPAJANJE PODATAKA SA STRAVOM BEZ BRISANJA!
      existingHistory[dateKey] = {
        ...existingEntry,
        title: todayWorkout.title, // Koristimo lep naziv aplikacije
        km: existingEntry.km || numericKm, // Zadržavamo tačne Stravine metre ako ih ima
        status: 'done',
        desc: todayWorkout.desc,
        week: todayWorkout.week, // Beležimo NJEGOV PRAVI ID, ne nužno kalendarsku nedelju!
        dayIndex: todayWorkout.dayIndex, 
        date: new Date().toISOString()
      };

      localStorage.setItem('completed_workouts', JSON.stringify(existingHistory));
      window.dispatchEvent(new Event('storage'));

      setModalInfo({
        isOpen: true,
        title: "Uspešno!",
        message: "Bravo! Trening je uspešno označen kao urađen i upisan u istoriju. Da li želiš da učitaš naredni trening?",
        type: "success",
        showNextOptions: true
      });
    } else if (status === 'skipped') {
      existingHistory[dateKey] = {
        ...existingEntry,
        title: todayWorkout.title,
        km: 0,
        status: 'missed',
        desc: todayWorkout.desc,
        week: todayWorkout.week,
        dayIndex: todayWorkout.dayIndex,
        date: new Date().toISOString()
      };

      localStorage.setItem('completed_workouts', JSON.stringify(existingHistory));
      window.dispatchEvent(new Event('storage'));

      setModalInfo({
        isOpen: true,
        title: "Preskočeno",
        message: "Trening je zabeležen kao preskočen (neuradjen). Glavu gore, sutra je novi dan! 💪",
        type: "info",
        showNextOptions: false
      });
    } else if (status === 'moved') {
      const nextIndex = todayWorkout.dayIndex + 1;
      if (nextIndex < 7) {
        const nextWorkout = masterPlan[todayWorkout.week][nextIndex];
        localStorage.setItem('current_today_workout', JSON.stringify(nextWorkout));
        
        setModalInfo({
          isOpen: true,
          title: "Pomereno",
          message: "Trening je uspešno pomeren za sutradan! Sutra te čeka ovaj izazov! 🔄",
          type: "warning",
          showNextOptions: false
        });
      } else {
        setModalInfo({
          isOpen: true,
          title: "Greška",
          message: "Nije moguće pomeriti jer sledeći dan prelazi u novu nedelju!",
          type: "error",
          showNextOptions: false
        });
        return;
      }
    }

    if (onUpdateStatus) {
      onUpdateStatus({
        week: currentWeekNum,
        dayIndex: dayOfWeekIndex,
        status: status,
        workout: todayWorkout
      });
    }
  };

  const handleLoadNextWorkout = () => {
    // Pametno nalazimo sledeci neodradjeni trening
    let nextWorkout = null;
    for (let i = todayWorkout.dayIndex + 1; i < 7; i++) {
      const checkW = masterPlan[todayWorkout.week][i];
      if (!isWorkoutDone(checkW)) {
        nextWorkout = checkW;
        break;
      }
    }

    if (nextWorkout) {
      localStorage.setItem('current_today_workout', JSON.stringify(nextWorkout));
    } else {
      localStorage.removeItem('current_today_workout');
    }
    
    setModalInfo({ ...modalInfo, isOpen: false });
    onBack();
  };

  const handleDeclineNextWorkout = () => {
    localStorage.removeItem('current_today_workout');
    setModalInfo({ ...modalInfo, isOpen: false });
    onBack();
  };

  const closeModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
    onBack();
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(31, 41, 55, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
        >
          ← Nazad
        </button>
        <div style={{
          fontSize: '11px',
          fontWeight: '900',
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Dnevni pregled {forcedWorkout ? '(Pomereno)' : ''}
        </div>
      </div>

      <div style={{
        backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.85), rgba(17, 24, 39, 0.92)), url('/danas.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(34, 197, 94, 0.4)',
        borderRadius: '20px',
        padding: '20px 18px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.15)',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {!isCurrentlyDone && (
              <>
                <button
                  onClick={() => handleAction('completed')}
                  title="Označi kao urađeno"
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#22c55e', border: 'none', cursor: 'pointer', boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)' }}
                />
                <button
                  onClick={() => handleAction('moved')}
                  title="Pomeri trening"
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#f97316', border: 'none', cursor: 'pointer', boxShadow: '0 0 8px rgba(249, 115, 22, 0.6)' }}
                />
                <button
                  onClick={() => handleAction('skipped')}
                  title="Preskoči"
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', cursor: 'pointer', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }}
                />
              </>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: isCurrentlyDone ? 'rgba(59, 130, 246, 0.15)' : 'rgba(34, 197, 94, 0.15)',
            border: `1px solid ${isCurrentlyDone ? 'rgba(59, 130, 246, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
            padding: '2px 8px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: '900',
            color: isCurrentlyDone ? '#60a5fa' : '#4ade80',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isCurrentlyDone ? '#60a5fa' : '#4ade80', boxShadow: `0 0 8px ${isCurrentlyDone ? '#60a5fa' : '#4ade80'}` }}></div>
            Nedelja {todayWorkout.week} - {todayWorkout.day || todayWorkout.dayName}
          </div>
        </div>

        <div style={{ marginTop: '4px' }}>
          <div style={{
            fontSize: '22px',
            fontWeight: '900',
            color: '#ffffff',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.3), 0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {todayWorkout.title}
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '12px 14px',
          fontSize: '13px',
          color: '#cbd5e1',
          lineHeight: '1.5',
          fontWeight: '500'
        }}>
          {todayWorkout.desc}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '12px'
        }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#9ca3af', textTransform: 'uppercase' }}>
              Zadana distanca
            </div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#4ade80', letterSpacing: '0.5px' }}>
              {todayWorkout.km}
            </div>
          </div>

          <div style={{
            background: isCurrentlyDone ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #22c55e, #14b8a6)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: `0 4px 15px ${isCurrentlyDone ? 'rgba(59, 130, 246, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
          }}>
            {isCurrentlyDone ? 'VEĆ ODRAĐENO ✔' : 'Aktivno'}
          </div>
        </div>
      </div>

      {modalInfo.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#111827',
            border: '1.5px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '24px',
            padding: '24px 20px 20px 20px',
            width: '100%',
            maxWidth: '340px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(34, 197, 94, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f3f4f6', lineHeight: '1.5' }}>
              {modalInfo.message}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
              {modalInfo.showNextOptions ? (
                <>
                  <button onClick={handleDeclineNextWorkout} style={{ background: '#374151', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Ne</button>
                  <button onClick={handleLoadNextWorkout} style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6)', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>Da</button>
                </>
              ) : (
                <button onClick={closeModal} style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6)', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '10px 22px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>Potvrdi</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}