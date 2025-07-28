import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/calculations';

const Slide2ExecutiveSummary = () => {
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
        2 / 5
      </motion.div>

      {/* Header */}
      <motion.div 
        className="text-center mb-10 border-b-4 border-primary-500 pb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-black text-gray-800 mb-4">Das Ergebnis auf einen Blick</h1>
        <p className="text-2xl text-gray-600 font-light">Beiträge für €10.000 monatliches Bruttogehalt (2025)</p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-10 mb-8">
          {/* Bremen Card */}
          <motion.div 
            className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.h3 
              className="text-3xl mb-4 font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Arbeitnehmerkammer Bremen
            </motion.h3>
            <motion.div 
              className="text-8xl font-black my-8 text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              {formatCurrency(12.00)}
            </motion.div>
            <motion.p 
              className="text-xl opacity-90 text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              pro Monat
            </motion.p>
            <motion.div 
              className="text-left space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Beitragssatz: 0,12%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Keine Beitragsbemessungsgrenze</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Steuerrechtliche Anbindung</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Saarland Card */}
          <motion.div 
            className="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.h3 
              className="text-3xl mb-4 font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Arbeitskammer Saarland
            </motion.h3>
            <motion.div 
              className="text-8xl font-black my-8 text-center"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              {formatCurrency(12.08)}
            </motion.div>
            <motion.p 
              className="text-xl opacity-90 text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              pro Monat
            </motion.p>
            <motion.div 
              className="text-left space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Beitragssatz: 0,15%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>BBG: €8.050 monatlich</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>Sozialversicherungsrechtliche Anbindung</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Important Notice */}
        <motion.div 
          className="bg-gradient-to-br from-accent-500 to-accent-600 text-white p-8 rounded-3xl text-center shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.strong 
            className="text-2xl block mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
          >
            ⚠️ Wichtiger Hinweis
          </motion.strong>
          <motion.p 
            className="text-lg leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            Die minimale Differenz von nur {formatCurrency(0.08)} verschleiert fundamentale Systemunterschiede! 
            Bei höheren Gehältern kehrt sich das Verhältnis drastisch um.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.0, duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Slide2ExecutiveSummary; 