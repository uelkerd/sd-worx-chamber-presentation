import React from 'react';
import { motion } from 'framer-motion';

const Slide1Title = () => {
  return (
    <motion.div 
      className="w-full h-full flex flex-col p-16 bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Slide Counter */}
      <motion.div 
        className="absolute top-8 right-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      >
        1 / 5
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-6xl">
          {/* Main Title */}
          <motion.h1 
            className="text-7xl font-black text-gray-800 mb-8 leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Kammerbeiträge
            <span className="block text-6xl text-primary-600 mt-2">
              Bremen vs. Saarland 2025
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            className="text-3xl text-gray-600 mb-12 font-light"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Rechtsvergleichende Systemanalyse für SD WORX
          </motion.h2>

          {/* Task Description Card */}
          <motion.div 
            className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white p-12 rounded-3xl mx-auto max-w-4xl shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="text-3xl mb-6 font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Aufgabenstellung
            </motion.h3>
            <motion.p 
              className="text-xl leading-relaxed font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Berechnung und Vergleich der Kammerbeiträge für ein monatliches Bruttogehalt von €10.000 
              sowie Identifizierung der wichtigsten Systemunterschiede zwischen Bremen und Saarland
            </motion.p>
          </motion.div>

          {/* Author Info */}
          <motion.div 
            className="mt-16 text-gray-700 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-8 text-lg">
              <div className="text-center">
                <p className="font-semibold text-gray-800">Datum</p>
                <p className="text-primary-600">26. Juli 2025</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">Bearbeiter</p>
                <p className="text-primary-600">Deniz Ülker</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-20"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: -360 }}
            transition={{ delay: 1.7, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Bottom Decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Slide1Title; 