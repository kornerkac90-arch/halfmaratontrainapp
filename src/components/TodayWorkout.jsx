import React from 'react';

export default function TodayWorkout({ onBack, onUpdateStatus }) {
  // Računamo tačan dan na osnovu razlike u datumima u odnosu na start 27.07.2026.
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

  // Zvanični plan treninga po nedeljama i danima
  const masterPlan = {
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

  const todayWorkout = masterPlan[currentWeekNum][dayOfWeekIndex];

  const handleAction = (status) => {
    if (status === 'moved' && dayOfWeekIndex === 6) {
      alert("Greška: Nije moguće pomeriti trening jer je danas nedelja – prelazak u narednu nedelju nije dozvoljen!");
      return;
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

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxSizing: 'border-box'
    }}>
      {/* Top Bar / Nazad dugme */}
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
          Dnevni pregled
        </div>
      </div>

      {/* Glavna kartica treninga */}
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
        {/* Zaglavlje sa dugmićima levo i bedžom desno */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* 3 dugmeta: Zeleno, Narandžasto, Crveno pomerena levo */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => handleAction('completed')}
              title="Označi kao urađeno"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                transition: 'transform 0.1s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <button
              onClick={() => handleAction('moved')}
              title="Pomeri trening (unutar tekuće nedelje)"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#f97316',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 8px rgba(249, 115, 22, 0.6)',
                transition: 'transform 0.1s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <button
              onClick={() => handleAction('skipped')}
              title="Preskoči trening"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
                transition: 'transform 0.1s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          {/* Bedž nedelje i dana desno */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            padding: '2px 8px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: '900',
            color: '#4ade80',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px #4ade80' }}></div>
            Nedelja {currentWeekNum} - {todayWorkout.day}
          </div>
        </div>

        {/* Sekcija sa naslovom u neon stilu */}
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

        {/* Detalji / Opis treninga */}
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

        {/* Donji segment sa kilometražom i statusom */}
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
            background: 'linear-gradient(135deg, #22c55e, #14b8a6)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
          }}>
            Aktivno
          </div>
        </div>
      </div>
    </div>
  );
}