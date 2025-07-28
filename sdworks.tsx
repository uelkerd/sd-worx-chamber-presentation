import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ChamberContributionsSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const chartRefs = {
    salary: useRef(null),
    effectiveRate: useRef(null)
  };
  const chartInstances = useRef({});

  const slides = [
    { title: "Title", number: 1 },
    { title: "Executive Summary", number: 2 },
    { title: "Calculations & Process", number: 3 },
    { title: "System Analysis", number: 4 },
    { title: "Conclusions", number: 5 }
  ];

  const showSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Chart initialization
  useEffect(() => {
    if (currentSlide === 3) {
      initSalaryChart();
      initEffectiveRateChart();
    }
  }, [currentSlide]);

  const initSalaryChart = () => {
    const canvas = chartRefs.salary.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (chartInstances.current.salary) {
      chartInstances.current.salary.destroy();
    }

    // Import Chart.js dynamically
    import('chart.js/auto').then((Chart) => {
      const salaries = [5000, 8050, 10000, 15000, 20000];
      const bremenContributions = salaries.map(s => s * 0.0012);
      const saarlandContributions = salaries.map(s => Math.min(s, 8050) * 0.0015);

      chartInstances.current.salary = new Chart.default(ctx, {
        type: 'line',
        data: {
          labels: salaries.map(s => `€${s.toLocaleString('de-DE')}`),
          datasets: [
            {
              label: 'Bremen (unbegrenzt)',
              data: bremenContributions,
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              fill: false,
              tension: 0.1,
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Saarland (gedeckelt)',
              data: saarlandContributions,
              borderColor: '#e74c3c',
              backgroundColor: 'rgba(231, 76, 60, 0.2)',
              fill: false,
              tension: 0.1,
              pointRadius: 6,
              pointHoverRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Kammerbeiträge über verschiedene Gehaltsstufen',
              font: { size: 16, weight: 'bold' }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Monatlicher Beitrag (€)'
              },
              ticks: {
                callback: (value) => `€${value.toFixed(2)}`
              }
            }
          }
        }
      });
    });
  };

  const initEffectiveRateChart = () => {
    const canvas = chartRefs.effectiveRate.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (chartInstances.current.effectiveRate) {
      chartInstances.current.effectiveRate.destroy();
    }

    import('chart.js/auto').then((Chart) => {
      const salaries = [5000, 8050, 10000, 15000, 20000, 25000, 30000];
      const bremenRates = salaries.map(() => 0.12);
      const saarlandRates = salaries.map(s => Math.min(s, 8050) * 0.15 / s);

      chartInstances.current.effectiveRate = new Chart.default(ctx, {
        type: 'line',
        data: {
          labels: salaries.map(s => `€${s.toLocaleString('de-DE')}`),
          datasets: [
            {
              label: 'Bremen (proportional)',
              data: bremenRates,
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              fill: false,
              tension: 0.1,
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Saarland (degressiv)',
              data: saarlandRates,
              borderColor: '#e74c3c',
              backgroundColor: 'rgba(231, 76, 60, 0.2)',
              fill: false,
              tension: 0.1,
              pointRadius: 6,
              pointHoverRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Effektive Beitragsbelastung nach Einkommensstufen',
              font: { size: 16, weight: 'bold' }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 0.2,
              title: {
                display: true,
                text: 'Effektiver Beitragssatz (%)'
              },
              ticks: {
                callback: (value) => `${(value * 100).toFixed(2)}%`
              }
            }
          }
        }
      });
    });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-600 to-purple-800 text-gray-800 overflow-hidden">
      {/* Slide 1: Title */}
      {currentSlide === 0 && (
        <div className="w-full h-full flex flex-col p-16 bg-white">
          <div className="absolute top-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
            1 / 5
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-black text-gray-800 mb-8">
                Kammerbeiträge Bremen vs. Saarland 2025
              </h1>
              <h2 className="text-3xl text-gray-600 mb-12">
                Rechtsvergleichende Systemanalyse für SD WORX
              </h2>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-10 rounded-3xl mx-auto max-w-2xl">
                <h3 className="text-2xl mb-4">Aufgabenstellung</h3>
                <p className="text-lg leading-relaxed">
                  Berechnung und Vergleich der Kammerbeiträge für ein monatliches Bruttogehalt von €10.000 
                  sowie Identifizierung der wichtigsten Systemunterschiede zwischen Bremen und Saarland
                </p>
              </div>
              <div className="mt-12 text-gray-700">
                <p><strong>Datum:</strong> 26. Juli 2025</p>
                <p><strong>Bearbeiter:</strong> Deniz Ülker</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 2: Executive Summary */}
      {currentSlide === 1 && (
        <div className="w-full h-full flex flex-col p-16 bg-white">
          <div className="absolute top-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
            2 / 5
          </div>
          <div className="text-center mb-10 border-b-4 border-blue-500 pb-6">
            <h1 className="text-4xl font-black text-gray-800 mb-2">Das Ergebnis auf einen Blick</h1>
            <p className="text-xl text-gray-600">Beiträge für €10.000 monatliches Bruttogehalt (2025)</p>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-10 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10 rounded-2xl shadow-xl">
                <h3 className="text-2xl mb-2">Arbeitnehmerkammer Bremen</h3>
                <div className="text-6xl font-black my-6">€12,00</div>
                <p className="text-lg opacity-90">pro Monat</p>
                <div className="mt-8 text-left">
                  <div>• Beitragssatz: 0,12%</div>
                  <div>• Keine Beitragsbemessungsgrenze</div>
                  <div>• Steuerrechtliche Anbindung</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-10 rounded-2xl shadow-xl">
                <h3 className="text-2xl mb-2">Arbeitskammer Saarland</h3>
                <div className="text-6xl font-black my-6">€12,08</div>
                <p className="text-lg opacity-90">pro Monat</p>
                <div className="mt-8 text-left">
                  <div>• Beitragssatz: 0,15%</div>
                  <div>• BBG: €8.050 monatlich</div>
                  <div>• Sozialversicherungsrechtliche Anbindung</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl text-center">
              <strong className="text-xl">Wichtiger Hinweis:</strong> Die minimale Differenz von nur €0,08 verschleiert fundamentale Systemunterschiede! 
              Bei höheren Gehältern kehrt sich das Verhältnis drastisch um.
            </div>
          </div>
        </div>
      )}

      {/* Slide 3: Detailed Calculations & Flowchart */}
      {currentSlide === 2 && (
        <div className="w-full h-full flex flex-col p-12 bg-white overflow-y-auto">
          <div className="absolute top-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
            3 / 5
          </div>
          <div className="text-center mb-8 border-b-4 border-blue-500 pb-6">
            <h1 className="text-4xl font-black text-gray-800 mb-2">Berechnungsdetails & Prozessfluss</h1>
            <p className="text-xl text-gray-600">Schritt-für-Schritt Analyse der unterschiedlichen Systeme</p>
          </div>
          
          {/* Detailed Calculations */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-500">
              <h3 className="text-blue-600 text-xl mb-4">Bremen - Berechnung</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="py-1"><strong>Bruttogehalt:</strong></td><td>€10.000</td></tr>
                  <tr><td className="py-1"><strong>Bemessungsgrundlage:</strong></td><td>€10.000 (ungekürzt)</td></tr>
                  <tr><td className="py-1"><strong>Beitragssatz:</strong></td><td>0,12%</td></tr>
                  <tr className="border-t-2 border-blue-500">
                    <td className="py-1 pt-2"><strong>Monatlicher Beitrag:</strong></td>
                    <td className="pt-2"><span className="bg-gradient-to-r from-cyan-300 to-pink-300 px-2 py-1 rounded font-bold">€12,00</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
                <strong>Rechtsbasis:</strong> Steuerpflichtiger Arbeitslohn nach LStDV
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-red-500">
              <h3 className="text-red-600 text-xl mb-4">Saarland - Berechnung</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="py-1"><strong>Bruttogehalt:</strong></td><td>€10.000</td></tr>
                  <tr><td className="py-1"><strong>BBG-Prüfung:</strong></td><td>&gt; €8.050 → gedeckelt</td></tr>
                  <tr><td className="py-1"><strong>Bemessungsgrundlage:</strong></td><td>€8.050</td></tr>
                  <tr><td className="py-1"><strong>Beitragssatz:</strong></td><td>0,15%</td></tr>
                  <tr><td className="py-1"><strong>Vor Rundung:</strong></td><td>€12,075</td></tr>
                  <tr className="border-t-2 border-red-500">
                    <td className="py-1 pt-2"><strong>Monatlicher Beitrag:</strong></td>
                    <td className="pt-2"><span className="bg-gradient-to-r from-cyan-300 to-pink-300 px-2 py-1 rounded font-bold">€12,08</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
                <strong>Rechtsbasis:</strong> SV-pflichtiges Bruttoentgelt nach SGB IV
              </div>
            </div>
          </div>

          {/* Flowchart */}
          <h3 className="text-2xl font-bold text-center mb-6">Berechnungsfluss im Detail</h3>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <h4 className="text-blue-600 text-lg font-bold mb-4">Bremen-Pfad</h4>
              <div className="space-y-3 w-full">
                <div className="bg-white border-3 border-blue-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>Bruttogehalt:</strong> €10.000
                </div>
                <div className="text-2xl text-blue-600 text-center">↓</div>
                <div className="bg-white border-3 border-blue-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>Steuerpflichtiger Arbeitslohn</strong>
                </div>
                <div className="text-2xl text-blue-600 text-center">↓</div>
                <div className="bg-white border-3 border-blue-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>Keine BBG-Prüfung:</strong> €10.000
                </div>
                <div className="text-2xl text-blue-600 text-center">↓</div>
                <div className="bg-white border-3 border-blue-500 rounded-xl p-3 text-center text-sm shadow">
                  €10.000 × 0,12%
                </div>
                <div className="text-2xl text-blue-600 text-center">↓</div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-3 text-center text-sm shadow">
                  <strong>Ergebnis: €12,00</strong>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-red-600 text-lg font-bold mb-4">Saarland-Pfad</h4>
              <div className="space-y-3 w-full">
                <div className="bg-white border-3 border-red-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>Bruttogehalt:</strong> €10.000
                </div>
                <div className="text-2xl text-red-600 text-center">↓</div>
                <div className="bg-white border-3 border-red-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>SV-pflichtiges Bruttoentgelt</strong>
                </div>
                <div className="text-2xl text-red-600 text-center">↓</div>
                <div className="bg-orange-500 text-white border-3 border-orange-600 rounded-xl p-3 text-center text-sm shadow">
                  <strong>BBG-Prüfung:</strong> €10.000 &gt; €8.050
                </div>
                <div className="text-2xl text-red-600 text-center">↓</div>
                <div className="bg-white border-3 border-red-500 rounded-xl p-3 text-center text-sm shadow">
                  <strong>Gedeckelt:</strong> €8.050
                </div>
                <div className="text-2xl text-red-600 text-center">↓</div>
                <div className="bg-white border-3 border-red-500 rounded-xl p-3 text-center text-sm shadow">
                  €8.050 × 0,15% = €12,075
                </div>
                <div className="text-2xl text-red-600 text-center">↓</div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-3 text-center text-sm shadow">
                  <strong>Ergebnis: €12,08</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 4: System Analysis (Charts & Table) */}
      {currentSlide === 3 && (
        <div className="w-full h-full flex flex-col p-12 bg-white overflow-y-auto">
          <div className="absolute top-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
            4 / 5
          </div>
          <div className="text-center mb-6 border-b-4 border-blue-500 pb-4">
            <h1 className="text-4xl font-black text-gray-800 mb-2">Systemanalyse & Vergleich</h1>
            <p className="text-xl text-gray-600">Entwicklung der Beiträge und effektive Belastung</p>
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-xl" style={{ height: '300px' }}>
              <canvas ref={chartRefs.salary}></canvas>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-xl" style={{ height: '300px' }}>
              <canvas ref={chartRefs.effectiveRate}></canvas>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-center">Beitragsvergleich nach Einkommensstufen</h3>
            <table className="w-full bg-white rounded-xl shadow-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left">Bruttogehalt</th>
                  <th className="p-3 text-left">Bremen (0,12%)</th>
                  <th className="p-3 text-left">Saarland (0,15%)</th>
                  <th className="p-3 text-left">Differenz</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">€5.000</td>
                  <td className="p-3">€6,00</td>
                  <td className="p-3">€7,50</td>
                  <td className="p-3 text-red-600">+€1,50 SL</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">€8.050</td>
                  <td className="p-3">€9,66</td>
                  <td className="p-3">€12,08</td>
                  <td className="p-3 text-red-600">+€2,42 SL</td>
                </tr>
                <tr className="border-b bg-yellow-100">
                  <td className="p-3">€10.000</td>
                  <td className="p-3">€12,00</td>
                  <td className="p-3">€12,08</td>
                  <td className="p-3 text-red-600">+€0,08 SL</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">€15.000</td>
                  <td className="p-3">€18,00</td>
                  <td className="p-3">€12,08</td>
                  <td className="p-3 text-blue-600">-€5,92 SL</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3">€20.000</td>
                  <td className="p-3">€24,00</td>
                  <td className="p-3">€12,08</td>
                  <td className="p-3 text-blue-600">-€11,92 SL</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-600 text-white p-5 rounded-xl">
              <h4 className="text-lg mb-2 font-bold">Bremen: Proportional</h4>
              <p className="text-sm">Konstanter Beitragssatz von 0,12% auf das gesamte Gehalt. Die Belastung steigt linear mit dem Einkommen.</p>
            </div>
            <div className="bg-red-600 text-white p-5 rounded-xl">
              <h4 className="text-lg mb-2 font-bold">Saarland: Degressiv</h4>
              <p className="text-sm">Effektiver Beitragssatz sinkt bei Einkommen über €8.050. Bei €20.000 nur noch 0,06% effektive Belastung.</p>
            </div>
          </div>
        </div>
      )}

      {/* Slide 5: Fundamental Differences & Conclusions */}
      {currentSlide === 4 && (
        <div className="w-full h-full flex flex-col p-12 bg-white overflow-y-auto">
          <div className="absolute top-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
            5 / 5
          </div>
          <div className="text-center mb-6 border-b-4 border-blue-500 pb-4">
            <h1 className="text-4xl font-black text-gray-800 mb-2">Systemunterschiede & Fazit</h1>
            <p className="text-xl text-gray-600">Strukturelle Unterschiede und strategische Implikationen</p>
          </div>
          
          {/* Fundamental Differences */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-blue-600 text-xl mb-4">1. Beitragsbemessungsgrenze</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-3 text-sm">
                <strong>Bremen:</strong> Unbegrenzt proportional<br />
                <small>Prinzip der steuerlichen Leistungsfähigkeit</small>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <strong>Saarland:</strong> Gedeckelt bei €8.050<br />
                <small>Degressive Entlastung für Besserverdienende</small>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-red-600 text-xl mb-4">2. Rechtssystematische Anbindung</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-3 text-sm">
                <strong>Bremen:</strong> Steuerrecht (LStDV)<br />
                <small>Integration in Lohnsteuerverfahren</small>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <strong>Saarland:</strong> Sozialversicherungsrecht (SGB IV)<br />
                <small>Anbindung an SV-Systematik</small>
              </div>
            </div>
          </div>

          {/* Key Findings & Recommendations */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-gray-800 text-xl mb-3">Kernerkenntnisse</h3>
              <div className="bg-white rounded-xl p-4 shadow-xl text-sm">
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-blue-600 font-bold mr-2">1.</span>
                    <span>Minimale nominale Differenz (€0,08) verschleiert fundamentale Systemunterschiede</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 font-bold mr-2">2.</span>
                    <span>Bremen: Steuerlogik ohne Obergrenze führt zu unbegrenzter proportionaler Belastung</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 font-bold mr-2">3.</span>
                    <span>Saarland: Sozialversicherungslogik mit BBG führt zu degressiver Belastung</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-600 font-bold mr-2">4.</span>
                    <span>Unterschiedliche rechtssystematische Anbindung erfordert separate Compliance-Workflows</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-gray-800 text-xl mb-3">Empfehlungen für SD WORX</h3>
              <div className="bg-white rounded-xl p-4 shadow-xl text-sm">
                <div className="mb-3">
                  <h4 className="text-red-600 mb-1">Technische Implementierung</h4>
                  <p className="text-gray-700">Separate Berechnungsmodule für beide Systeme entwickeln, BBG-Monitoring für Saarland implementieren</p>
                </div>
                <div className="mb-3">
                  <h4 className="text-red-600 mb-1">Compliance-Management</h4>
                  <p className="text-gray-700">Regelmäßige Updates der BBG-Werte, Monitoring von Beitragssatzänderungen</p>
                </div>
                <div>
                  <h4 className="text-red-600 mb-1">Strategische Überlegungen</h4>
                  <p className="text-gray-700">Flexible, rechtssystemspezifische Lösungsarchitekturen für föderale Komplexität</p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Conclusion */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-xl text-center">
            <h4 className="text-xl mb-3">Strategische Schlussfolgerung</h4>
            <p className="text-sm leading-relaxed">
              Die Existenz zweier fundamental verschiedener Kammersysteme in Deutschland unterstreicht die Notwendigkeit 
              flexibler, rechtssystemspezifischer Lösungsarchitekturen für internationale Payroll-Anbieter wie SD WORX.
            </p>
          </div>
          
          <div className="text-center text-gray-600 text-xs mt-4">
            © 2025 SD WORX Analyse | Rechtsstand: 2025 | Quellen: ArbnkG Bremen, AKG Saarland, SV-Rechengrößenverordnung 2025
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 p-4 rounded-full shadow-xl">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => showSlide(index)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              currentSlide === index 
                ? 'bg-red-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center ${
            currentSlide === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center ${
            currentSlide === slides.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChamberContributionsSlides;