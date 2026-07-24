import React, { useState } from 'react';

export default function TrainingPlan({ onBack }) {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const weeks = [
    {
      week: 1,
      total: "Ukupno ~26 km",
      focus: "Uvodna nedelja - Baza",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1",
        "SRI: Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (1 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 8 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 2,
      total: "Ukupno ~28 km",
      focus: "Izgradnja izdržljivosti",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 2 min sporije ~7:30) + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 10 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 3,
      total: "Ukupno ~31 km",
      focus: "Aerobna baza",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Fartlek (40 min): 10 min zagrijavanje + 20 min smjenjivanja (2 min brže ~6:30 / 1 min sporije ~7:30) + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 12 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 4,
      total: "Ukupno ~26 km",
      focus: "Nedelja oporavka",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1",
        "SRI: Fartlek (35 min): 10 min zagrijavanje + 15 min piramida (1'-1'-2'-2'-3'-3'-2'-2'-1'-1' uz 1' pauze) + 8 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 8 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 5,
      total: "Ukupno ~32 km",
      focus: "Intervali i tempo",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Intervali: 12 min zagrijavanje + 6 x 400m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 12 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 6,
      total: "Ukupno ~35 km",
      focus: "Duže deonice 800m",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Intervali: 10 min zagrijavanje + 4 x 800m (~6:00 min/km) uz 2 min pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 14 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 7,
      total: "Ukupno ~37 km",
      focus: "Test gelova i ishrane",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Intervali: 12 min zagrijavanje + 6 x 500m (~5:45 - 6:00 min/km) uz 90s pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 16 km @ 7:10 - 7:30 min/km (Odlična prilika za testiranje gelova)"
      ]
    },
    {
      week: 8,
      total: "Ukupno ~31 km",
      focus: "Nedelja oporavka",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + Trening snage 1",
        "SRI: Fartlek (42 min): 10 min zagrijavanje + piramida (1'-2'-3'-4'-3'-2'-1' uz 1' lagano) + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 6 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 12 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 9,
      total: "Ukupno ~39 km",
      focus: "Najduži tjedan - Generalna proba",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Tempo trčanje: 10 min zagrijavanje + 2 x 2 km (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 8 km @ 7:15 min/km + Trening snage 2/3",
        "SUB: Odmor",
        "NED: Dužina 18 km @ 7:10 - 7:30 min/km (Generalna proba dužine)"
      ]
    },
    {
      week: 10,
      total: "Ukupno ~36 km",
      focus: "Kilometarski intervali",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja + Trening snage 1",
        "SRI: Intervali: 10 min zagrijavanje + 4 x 1000m (~6:00 - 6:10 min/km) uz 2 min pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 8 km @ 7:15 min/km",
        "SUB: Odmor",
        "NED: Dužina 14 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 11,
      total: "Ukupno ~34 km",
      focus: "Uvod u Tapering",
      details: [
        "PON: Odmor",
        "UTO: Lagano trčanje 5 km @ 7:15 min/km + 3 x 100m ubrzanja",
        "SRI: Tempo: 10 min zagrijavanje + 5 km (~6:30 min/km) + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Lagano trčanje 8 km @ 7:15 min/km",
        "SUB: Odmor",
        "NED: Dužina 12 km @ 7:10 - 7:30 min/km"
      ]
    },
    {
      week: 12,
      total: "FINALNI TJEDAN",
      focus: "Tapering i Trka - Ljubljana!",
      details: [
        "PON: Odmor",
        "UTO: Odmor",
        "SRI: Kratki intervali: 10 min zagrijavanje + 3 x 1000m (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Odmor",
        "SUB (Dan prije): Lagani nadražaj: 5 km @ 7:20 min/km + 3 x 100m ubrzanja",
        "NED (UTRKA): POLUMARATON (Cilj ispod 2h 30m) 🏅"
      ]
    }
  ];

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
        📅 Plan treninga (12 nedelja - Ljubljanski polumaraton)
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
        {weeks.map((w) => {
          const isExpanded = expandedWeek === w.week;
          return (
            <div 
              key={w.week}
              onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
              style={{
                backgroundColor: '#1f2937',
                border: isExpanded ? '1px solid #4ade80' : '1px solid #374151',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#f3f4f6', fontSize: '14px' }}>
                  Nedelja {w.week} {w.week === 1 ? '🎯 (Start: 27.07.)' : ''}
                </span>
                <span style={{ backgroundColor: '#22c55e22', color: '#4ade80', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  {w.total}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                {w.focus}
              </div>

              {/* Detalji po danima koji se otvaraju na klik */}
              {isExpanded && (
                <div style={{ marginTop: '10px', borderTop: '1px solid #374151', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {w.details.map((day, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.4' }}>
                      • {day}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}