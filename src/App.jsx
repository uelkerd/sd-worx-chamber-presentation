import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1Title from './components/Slide1Title';
import Slide2ExecutiveSummary from './components/Slide2ExecutiveSummary';
import Charts from './components/Charts';
import Navigation from './components/Navigation';
import { getComparisonData, formatCurrency } from './utils/calculations';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const totalSlides = 5;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setCurrentSlide(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const handleSlideChange = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // This would integrate with a PDF export library
      // For now, we'll just show a message
      alert('PDF Export functionality would be implemented here. The presentation is ready for export!');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const comparisonData = getComparisonData();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Slide 1: Title */}
        {currentSlide === 0 && (
          <motion.div
            key="slide-1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Slide1Title />
          </motion.div>
        )}

        {/* Slide 2: Executive Summary */}
        {currentSlide === 1 && (
          <motion.div
            key="slide-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Slide2ExecutiveSummary />
          </motion.div>
        )}

        {/* Slide 3: Detailed Calculations & Flowchart */}
        {currentSlide === 2 && (
          <motion.div
            key="slide-3"
            className="w-full h-full flex flex-col p-12 bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slide Counter */}
            <motion.div 
              className="absolute top-8 right-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              3 / 5
            </motion.div>

            {/* Header */}
            <motion.div 
              className="text-center mb-8 border-b-4 border-primary-500 pb-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-black text-gray-800 mb-4">Berechnungsdetails & Prozessfluss</h1>
              <p className="text-2xl text-gray-600 font-light">Schritt-für-Schritt Analyse der unterschiedlichen Systeme</p>
            </motion.div>
            
            {/* Detailed Calculations */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-2xl border-l-4 border-primary-500 transform hover:scale-105 transition-transform duration-300"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-primary-600 text-2xl mb-6 font-bold">Bremen - Berechnung</h3>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Bruttogehalt:</span>
                    <span className="text-primary-600 font-bold">€10.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Bemessungsgrundlage:</span>
                    <span className="text-primary-600 font-bold">€10.000 (ungekürzt)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Beitragssatz:</span>
                    <span className="text-primary-600 font-bold">0,12%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg border-2 border-primary-300">
                    <span className="font-bold text-lg">Monatlicher Beitrag:</span>
                    <span className="text-2xl font-black text-primary-700">{formatCurrency(12.00)}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded-xl text-sm">
                  <strong>Rechtsbasis:</strong> Steuerpflichtiger Arbeitslohn nach LStDV
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-2xl border-l-4 border-secondary-500 transform hover:scale-105 transition-transform duration-300"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-secondary-600 text-2xl mb-6 font-bold">Saarland - Berechnung</h3>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Bruttogehalt:</span>
                    <span className="text-secondary-600 font-bold">€10.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg border border-orange-300">
                    <span className="font-semibold">BBG-Prüfung:</span>
                    <span className="text-orange-700 font-bold">&gt; €8.050 → gedeckelt</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Bemessungsgrundlage:</span>
                    <span className="text-secondary-600 font-bold">€8.050</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Beitragssatz:</span>
                    <span className="text-secondary-600 font-bold">0,15%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Vor Rundung:</span>
                    <span className="text-secondary-600 font-bold">€12,075</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-lg border-2 border-secondary-300">
                    <span className="font-bold text-lg">Monatlicher Beitrag:</span>
                    <span className="text-2xl font-black text-secondary-700">{formatCurrency(12.08)}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded-xl text-sm">
                  <strong>Rechtsbasis:</strong> SV-pflichtiges Bruttoentgelt nach SGB IV
                </div>
              </motion.div>
            </div>

            {/* Flowchart */}
            <motion.h3 
              className="text-3xl font-bold text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Berechnungsfluss im Detail
            </motion.h3>
            <div className="grid grid-cols-2 gap-12">
              <motion.div 
                className="flex flex-col items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <h4 className="text-primary-600 text-xl font-bold mb-6">Bremen-Pfad</h4>
                <div className="space-y-4 w-full">
                  {[
                    { text: 'Bruttogehalt: €10.000', bg: 'bg-white', border: 'border-primary-500' },
                    { text: 'Steuerpflichtiger Arbeitslohn', bg: 'bg-white', border: 'border-primary-500' },
                    { text: 'Keine BBG-Prüfung: €10.000', bg: 'bg-white', border: 'border-primary-500' },
                    { text: '€10.000 × 0,12%', bg: 'bg-white', border: 'border-primary-500' },
                    { text: 'Ergebnis: €12,00', bg: 'bg-gradient-to-br from-green-500 to-green-600 text-white', border: 'border-green-600' }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className={`${step.bg} border-3 ${step.border} rounded-xl p-4 text-center text-lg shadow-lg`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                    >
                      <strong>{step.text}</strong>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <h4 className="text-secondary-600 text-xl font-bold mb-6">Saarland-Pfad</h4>
                <div className="space-y-4 w-full">
                  {[
                    { text: 'Bruttogehalt: €10.000', bg: 'bg-white', border: 'border-secondary-500' },
                    { text: 'SV-pflichtiges Bruttoentgelt', bg: 'bg-white', border: 'border-secondary-500' },
                    { text: 'BBG-Prüfung: €10.000 > €8.050', bg: 'bg-orange-500 text-white', border: 'border-orange-600' },
                    { text: 'Gedeckelt: €8.050', bg: 'bg-white', border: 'border-secondary-500' },
                    { text: '€8.050 × 0,15% = €12,075', bg: 'bg-white', border: 'border-secondary-500' },
                    { text: 'Ergebnis: €12,08', bg: 'bg-gradient-to-br from-green-500 to-green-600 text-white', border: 'border-green-600' }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className={`${step.bg} border-3 ${step.border} rounded-xl p-4 text-center text-lg shadow-lg`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                    >
                      <strong>{step.text}</strong>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Slide 4: System Analysis (Charts & Table) */}
        {currentSlide === 3 && (
          <motion.div
            key="slide-4"
            className="w-full h-full flex flex-col p-12 bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slide Counter */}
            <motion.div 
              className="absolute top-8 right-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              4 / 5
            </motion.div>

            {/* Header */}
            <motion.div 
              className="text-center mb-6 border-b-4 border-primary-500 pb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-black text-gray-800 mb-4">Systemanalyse & Vergleich</h1>
              <p className="text-2xl text-gray-600 font-light">Entwicklung der Beiträge und effektive Belastung</p>
            </motion.div>
            
            {/* Charts */}
            <Charts currentSlide={currentSlide} />

            {/* Comparison Table */}
            <motion.div 
              className="mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Beitragsvergleich nach Einkommensstufen</h3>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                      <th className="p-4 text-left text-lg">Bruttogehalt</th>
                      <th className="p-4 text-left text-lg">Bremen (0,12%)</th>
                      <th className="p-4 text-left text-lg">Saarland (0,15%)</th>
                      <th className="p-4 text-left text-lg">Differenz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <motion.tr 
                        key={index}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          row.salary === 10000 ? 'bg-yellow-100' : ''
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                      >
                        <td className="p-4 font-semibold">{formatCurrency(row.salary)}</td>
                        <td className="p-4 text-primary-600 font-bold">{formatCurrency(row.bremen)}</td>
                        <td className="p-4 text-secondary-600 font-bold">{formatCurrency(row.saarland)}</td>
                        <td className={`p-4 font-bold ${
                          row.difference > 0 ? 'text-secondary-600' : 'text-primary-600'
                        }`}>
                          {row.difference > 0 ? '+' : ''}{formatCurrency(row.difference)} {row.difference > 0 ? 'SL' : 'HB'}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Key Insights */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-6 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl mb-3 font-bold">Bremen: Proportional</h4>
                <p className="text-sm leading-relaxed">
                  Konstanter Beitragssatz von 0,12% auf das gesamte Gehalt. Die Belastung steigt linear mit dem Einkommen.
                </p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white p-6 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl mb-3 font-bold">Saarland: Degressiv</h4>
                <p className="text-sm leading-relaxed">
                  Effektiver Beitragssatz sinkt bei Einkommen über €8.050. Bei €20.000 nur noch 0,06% effektive Belastung.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Slide 5: Fundamental Differences & Conclusions */}
        {currentSlide === 4 && (
          <motion.div
            key="slide-5"
            className="w-full h-full flex flex-col p-12 bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slide Counter */}
            <motion.div 
              className="absolute top-8 right-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              5 / 5
            </motion.div>

            {/* Header */}
            <motion.div 
              className="text-center mb-6 border-b-4 border-primary-500 pb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-black text-gray-800 mb-4">Systemunterschiede & Fazit</h1>
              <p className="text-2xl text-gray-600 font-light">Strukturelle Unterschiede und strategische Implikationen</p>
            </motion.div>
            
            {/* Fundamental Differences */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-2xl"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-primary-600 text-2xl mb-6 font-bold">1. Beitragsbemessungsgrenze</h3>
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-xl border-l-4 border-primary-500">
                    <strong className="text-primary-700">Bremen:</strong> Unbegrenzt proportional<br />
                    <small className="text-gray-600">Prinzip der steuerlichen Leistungsfähigkeit</small>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-xl border-l-4 border-secondary-500">
                    <strong className="text-secondary-700">Saarland:</strong> Gedeckelt bei €8.050<br />
                    <small className="text-gray-600">Degressive Entlastung für Besserverdienende</small>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-2xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-secondary-600 text-2xl mb-6 font-bold">2. Rechtssystematische Anbindung</h3>
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-xl border-l-4 border-primary-500">
                    <strong className="text-primary-700">Bremen:</strong> Steuerrecht (LStDV)<br />
                    <small className="text-gray-600">Integration in Lohnsteuerverfahren</small>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-xl border-l-4 border-secondary-500">
                    <strong className="text-secondary-700">Saarland:</strong> Sozialversicherungsrecht (SGB IV)<br />
                    <small className="text-gray-600">Anbindung an SV-Systematik</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Key Findings & Recommendations */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <h3 className="text-gray-800 text-2xl mb-4 font-bold">Kernerkenntnisse</h3>
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <ul className="space-y-4">
                    {[
                      "Minimale nominale Differenz (€0,08) verschleiert fundamentale Systemunterschiede",
                      "Bremen: Steuerlogik ohne Obergrenze führt zu unbegrenzter proportionaler Belastung",
                      "Saarland: Sozialversicherungslogik mit BBG führt zu degressiver Belastung",
                      "Unterschiedliche rechtssystematische Anbindung erfordert separate Compliance-Workflows"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                      >
                        <span className="text-primary-600 font-bold mr-3 mt-1">{index + 1}.</span>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <h3 className="text-gray-800 text-2xl mb-4 font-bold">Empfehlungen für SD WORX</h3>
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-accent-600 mb-2 font-bold">Technische Implementierung</h4>
                      <p className="text-gray-700 text-sm">Separate Berechnungsmodules für beide Systeme entwickeln, BBG-Monitoring für Saarland implementieren</p>
                    </div>
                    <div>
                      <h4 className="text-accent-600 mb-2 font-bold">Compliance-Management</h4>
                      <p className="text-gray-700 text-sm">Regelmäßige Updates der BBG-Werte, Monitoring von Beitragssatzänderungen</p>
                    </div>
                    <div>
                      <h4 className="text-accent-600 mb-2 font-bold">Strategische Überlegungen</h4>
                      <p className="text-gray-700 text-sm">Flexible, rechtssystemspezifische Lösungsarchitekturen für föderale Komplexität</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Strategic Conclusion */}
            <motion.div 
              className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white p-8 rounded-3xl text-center shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-2xl mb-4 font-bold">Strategische Schlussfolgerung</h4>
              <p className="text-lg leading-relaxed">
                Die Existenz zweier fundamental verschiedener Kammersysteme in Deutschland unterstreicht die Notwendigkeit 
                flexibler, rechtssystemspezifischer Lösungsarchitekturen für internationale Payroll-Anbieter wie SD WORX.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center text-gray-600 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              © 2025 SD WORX Analyse | Rechtsstand: 2025 | Quellen: ArbnkG Bremen, AKG Saarland, SV-Rechengrößenverordnung 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSlideChange={handleSlideChange}
        onExportPDF={handleExportPDF}
      />

      {/* Loading Overlay for PDF Export */}
      {isExporting && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">PDF wird erstellt...</p>
            <p className="text-gray-600 text-sm">Bitte warten Sie einen Moment</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App; 