import React, { useState } from 'react';

export default function CurrentWeekView({ onBack }) {
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '', workoutToSet: null });

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const startDate = new Date('2026-07-27');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let currentWeekNum = 1;
  if (diffDays >= 0) {
    currentWeekNum = Math.floor(diffDays / 7) + 1;
    if (currentWeekNum > 12) currentWeekNum = 12;
  }

  const rawMasterPlan = {
    1: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (1 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km" }
    ],
    2: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 2 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 10 km @ 7:10 - 7:30 min/km", km: "10 km" }
    ],
    3: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Fartlek", desc: "Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    4: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Fartlek (Oporavak)", desc: "Fartlek (35 min): 10 min zagrijavanje + 15 min piramida (1'-1'-2'-2'-3'-3'-2'-2'-1'-1' uz 1' pauze) + 8 min rastrčavanje", km: "~5 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 8 km @ 7:10 - 7:30 min/km", km: "8 km" }
    ],
    5: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Intervali", desc: "12 min zagrijavanje + 6 x 400m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    6: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Intervali (800m)", desc: "10 min zagrijavanje + 4 x 800m (~6:00 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km" }
    ],
    7: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Intervali (500m)", desc: "12 min zagrijavanje + 6 x 500m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina (Test gelova)", desc: "Dužina 16 km @ 7:10 - 7:30 min/km (Testiranje ishrane i gelova)", km: "16 km" }
    ],
    8: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Fartlek piramida", desc: "Fartlek (42 min): 10 min zagrijavanje + piramida (1'-2'-3'-4'-3'-2'-1' uz 1' lagano) + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3", km: "6 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    9: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 2 x 2 km (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~7 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje + Snaga", desc: "Lagano trčanje 8 km @ 7:15 min/km + Trening snage 2/3", km: "8 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Generalna proba", desc: "Dužina 18 km @ 7:10 - 7:30 min/km (Generalna proba dužine)", km: "18 km" }
    ],
    10: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja + Snaga", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1", km: "5 km" },
      { dayName: "Sreda", title: "Kilometarski intervali", desc: "10 min zagrijavanje + 4 x 1000m (~6:00 - 6:10 min/km) uz 2 min pauze + 10 min rastrčavanje", km: "~8 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 14 km @ 7:10 - 7:30 min/km", km: "14 km" }
    ],
    11: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Lagano trčanje + Ubrzanja", desc: "Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja", km: "5 km" },
      { dayName: "Sreda", title: "Tempo trčanje", desc: "10 min zagrijavanje + 5 km (~6:30 min/km) + 10 min rastrčavanje", km: "~7 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Lagano trčanje", desc: "Lagano trčanje 8 km @ 7:15 min/km", km: "8 km" },
      { dayName: "Subota", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Nedelja", title: "Dužina", desc: "Dužina 12 km @ 7:10 - 7:30 min/km", km: "12 km" }
    ],
    12: [
      { dayName: "Ponedeljak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Utorak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Sreda", title: "Kratki intervali", desc: "10 min zagrijavanje + 3 x 1000m (~6:30 min/km) uz 2 min lagane pauze + 10 min rastrčavanje", km: "~6 km" },
      { dayName: "Četvrtak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Petak", title: "Odmor", desc: "Odmor", km: "0 km" },
      { dayName: "Subota", title: "Dan pred trku", desc: "Lagani nadražaj: 5 km laganog trčanja @ 7:20 min/km + 3 x 100m lagana ubrzanja", km: "5 km" },
      { dayName: "Nedelja", title: "Dan utrke", desc: "Polumaratonski nastup (Ljubljana - Cilj ispod 2h 30m)", km: "21.1 km" }
    ]
  };

  const weekDays = rawMasterPlan[currentWeekNum] || [];

  const handleMoveToToday = (workout, dayIndex) => {
    const historyVals = Object.values(JSON.parse(localStorage.getItem('completed_workouts') || '{}'));
    
    // Proveravamo striktno po ID-ju (nedelja + danIndex)
    const isAlreadyDone = historyVals.some(h => h.week === currentWeekNum && h.dayIndex === dayIndex && h.status === 'done');

    // Učitavamo ID-jeve u izabrani trening pre snimanja
    const workoutWithId = { ...workout, week: currentWeekNum, dayIndex: dayIndex };

    if (isAlreadyDone) {
      setModalInfo({
        isOpen: true,
        title: "Već odrađeno",
        message: `Trening "${workout.title}" (${workout.dayName}) je već zabeležen kao odrađen u istoriji. Da li želiš da ga ponovo postaviš kao današnji trening i ponoviš ga?`,
        workoutToSet: workoutWithId
      });
    } else {
      localStorage.setItem('current_today_workout', JSON.stringify(workoutWithId));
      onBack();
    }
  };

  const confirmRepeatWorkout = () => {
    if (modalInfo.workoutToSet) {
      localStorage.setItem('current_today_workout', JSON.stringify(modalInfo.workoutToSet));
    }
    setModalInfo({ isOpen: false, title: '', message: '', workoutToSet: null });
    onBack();
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
        <button onClick={onBack} style={{ background: 'rgba(31, 41, 55, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>← Nazad na tablu</button>
        <div style={{ fontSize: '11px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Nedeljni pregled</div>
      </div>

      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px', textShadow: '0 0 10px rgba(34, 197, 94, 0.4)' }}>Trenutna nedelja {currentWeekNum}</h2>
        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>Kalendarski prikaz treninga. Klikom na "Prebaci u danas" biraš željeni trening.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {weekDays.map((item, index) => (
          <div key={index} style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.94)), url('/trenutnanedelja.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{capitalizeWords(item.dayName)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: '900' }}>{item.km}</span>
                <button onClick={() => handleMoveToToday(item, index)} style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6)', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '4px 8px', fontSize: '9px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase' }} title="Postavi kao današnji">Prebaci u danas</button>
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{capitalizeWords(item.title)}</div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4', fontWeight: '500' }}>{capitalizeWords(item.desc)}</div>
          </div>
        ))}
      </div>

      {modalInfo.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#111827', border: '1.5px solid rgba(34, 197, 94, 0.5)', borderRadius: '24px', padding: '24px 20px 20px 20px', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f3f4f6', lineHeight: '1.5' }}>{modalInfo.message}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
              <button onClick={() => setModalInfo({ isOpen: false, title: '', message: '', workoutToSet: null })} style={{ background: '#374151', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Otkaži</button>
              <button onClick={confirmRepeatWorkout} style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6)', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>Da, ponovi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}