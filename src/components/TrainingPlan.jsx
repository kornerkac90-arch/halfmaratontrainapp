import React, { useState } from 'react';

export default function TrainingPlan({ onBack }) {
  const [expandedWeek, setExpandedWeek] = useState(null);

  // Funkcija koja svaku reč pretvara da počinje velikim slovom
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

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
      focus: "Najduža nedelja - Generalna proba",
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
      total: "Finalna nedelja",
      focus: "Tapering i trka - Ljubljana",
      details: [
        "PON: Odmor",
        "UTO: Odmor",
        "SRI: Kratki intervali: 10 min zagrijavanje + 3 x 1000m (~6:30 min/km) uz 2 min pauze + 10 min rastrčavanje",
        "ČET: Odmor",
        "PET: Odmor",
        "SUB (Dan prije): Lagani nadražaj: 5 km @ 7:20 min/km + 3 x 100m ubrzanja",
        "NED (Utrka): Polumaratonski nastup (Cilj ispod 2h 30m)"
      ]
    }
  ];

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
          ← Nazad na tablu
        </button>
        <div style={{
          fontSize: '11px',
          fontWeight: '900',
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Glavni plan
        </div>
      </div>

      {/* Zaglavlje sekcije */}
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '900',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '4px',
          textShadow: '0 0 10px rgba(34, 197, 94, 0.4)'
        }}>
          Plan treninga (12 nedelja)
        </h2>
        <p style={{
          fontSize: '11px',
          color: '#9ca3af',
          fontWeight: '500'
        }}>
          Kompletan pripremni plan za ljubljanski polumaraton. Klikni na nedelju za detaljan pregled.
        </p>
      </div>

      {/* Lista nedelja */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHieght: 'none',
        overflowY: 'visible',
        paddingRight: '0px'
      }}>
        {weeks.map((w) => {
          const isExpanded = expandedWeek === w.week;
          return (
            <div
              key={w.week}
              onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
              style={{
                backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.94)), url('/plan.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: 'blur(10px)',
                border: isExpanded ? '1px solid rgba(34, 197, 94, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                padding: '12px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: isExpanded ? '0 6px 20px rgba(34, 197, 94, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '900',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Nedelja {w.week} {w.week === 1 ? '(Start: 27.07.)' : ''}
                </span>
                <span style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '900',
                  letterSpacing: '0.5px'
                }}>
                  {capitalizeWords(w.total)}
                </span>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#4ade80',
                fontWeight: '700',
                letterSpacing: '0.3px'
              }}>
                {capitalizeWords(w.focus)}
              </div>

              {/* Detalji po danima koji se otvaraju na klik */}
              {isExpanded && (
                <div style={{
                  marginTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {w.details.map((day, idx) => (
                    <div key={idx} style={{
                      fontSize: '11px',
                      color: '#cbd5e1',
                      lineHeight: '1.4',
                      fontWeight: '500'
                    }}>
                      • {capitalizeWords(day)}
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