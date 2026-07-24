import React from 'react';

export default function CurrentWeekView({ onBack }) {
  // Izračunavanje tekuće nedelje na osnovu datuma 27.07.2026.
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

  // Master plan baza podataka
  const masterPlan = {
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
      { dayName: "Nedelja", title: "DAN UTRKE 🏅", desc: "POLUMARATON (Ljubljana - Cilj ispod 2h 30m)", km: "21.1 km" }
    ]
  };

  const weekDays = masterPlan[currentWeekNum] || [];

  return (
    <div style={{ width: '100%', color: '#ffffff' }}>
      <button 
        onClick={onBack}
        style={{
          backgroundColor: '#374151',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          marginBottom: '15px',
          fontWeight: 'bold',
          fontSize: '13px'
        }}
      >
        ← Nazad na tablu
      </button>

      <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#4ade80' }}>
        📅 Trenutna nedelja (Nedelja {currentWeekNum})
      </h2>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '15px' }}>
        Prikaz kalendarske nedelje (od ponedeljka do nedelje) iz zvaničnog plana.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {weekDays.map((item, index) => (
          <div key={index} style={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4ade80' }}>
                {item.dayName}
              </span>
              <span style={{ backgroundColor: '#22c55e22', color: '#4ade80', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                {item.km}
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f3f4f6' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.4' }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}