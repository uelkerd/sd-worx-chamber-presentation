import React from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = ({ currentSlide, totalSlides, onSlideChange, onExportPDF }) => {
  const slides = [
    { title: "Title", number: 1 },
    { title: "Executive Summary", number: 2 },
    { title: "Calculations & Process", number: 3 },
    { title: "System Analysis", number: 4 },
    { title: "Conclusions", number: 5 }
  ];

  const nextSlide = () => onSlideChange(currentSlide + 1);
  const prevSlide = () => onSlideChange(currentSlide - 1);

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl border border-gray-200"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Previous Button */}
      <motion.button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
          currentSlide === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105 active:scale-95'
        }`}
        whileHover={currentSlide !== 0 ? { scale: 1.05 } : {}}
        whileTap={currentSlide !== 0 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Zurück</span>
      </motion.button>

      {/* Slide Numbers */}
      <div className="flex gap-1">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              currentSlide === index 
                ? 'bg-secondary-600 text-white shadow-lg' 
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={nextSlide}
        disabled={currentSlide === totalSlides - 1}
        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
          currentSlide === totalSlides - 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105 active:scale-95'
        }`}
        whileHover={currentSlide !== totalSlides - 1 ? { scale: 1.05 } : {}}
        whileTap={currentSlide !== totalSlides - 1 ? { scale: 0.95 } : {}}
      >
        <span className="hidden sm:inline">Weiter</span>
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Export PDF Button */}
      <motion.button
        onClick={onExportPDF}
        className="px-4 py-2 rounded-full font-semibold bg-accent-600 text-white hover:bg-accent-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 ml-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-5 h-5" />
        <span className="hidden sm:inline">PDF</span>
      </motion.button>

      {/* Slide Counter */}
      <div className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm flex items-center">
        {currentSlide + 1} / {totalSlides}
      </div>
    </motion.div>
  );
};

export default Navigation; 