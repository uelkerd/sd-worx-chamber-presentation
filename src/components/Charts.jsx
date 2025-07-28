import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { CHART_DATA } from '../utils/calculations';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = ({ currentSlide }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentSlide === 3) {
      setIsLoading(true);
      setError(null);
      // Simulate chart loading
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [currentSlide]);

  const salaryChartData = {
    labels: CHART_DATA.salaries.map(s => `€${s.toLocaleString('de-DE')}`),
    datasets: [
      {
        label: 'Bremen (unbegrenzt)',
        data: CHART_DATA.bremenContributions,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: 'Saarland (gedeckelt)',
        data: CHART_DATA.saarlandContributions,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3,
      }
    ]
  };

  const rateChartData = {
    labels: CHART_DATA.salaries.map(s => `€${s.toLocaleString('de-DE')}`),
    datasets: [
      {
        label: 'Bremen (proportional)',
        data: CHART_DATA.bremenRates.map(r => r * 100),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: 'Saarland (degressiv)',
        data: CHART_DATA.saarlandRates.map(r => r * 100),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#0ea5e9',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const salaryChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Kammerbeiträge über verschiedene Gehaltsstufen',
        font: { size: 16, weight: 'bold' },
        color: '#1f2937',
        padding: 20
      }
    },
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monatlicher Beitrag (€)',
          font: { size: 12, weight: '600' }
        },
        ticks: {
          ...chartOptions.scales.y.ticks,
          callback: (value) => `€${value.toFixed(2)}`
        }
      }
    }
  };

  const rateChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Effektive Beitragsbelastung nach Einkommensstufen',
        font: { size: 16, weight: 'bold' },
        color: '#1f2937',
        padding: 20
      }
    },
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
        max: 20,
        title: {
          display: true,
          text: 'Effektiver Beitragssatz (%)',
          font: { size: 12, weight: '600' }
        },
        ticks: {
          ...chartOptions.scales.y.ticks,
          callback: (value) => `${value.toFixed(2)}%`
        }
      }
    }
  };

  if (currentSlide !== 3) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-xl animate-pulse" style={{ height: '300px' }}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Lade Diagramm...</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-xl animate-pulse" style={{ height: '300px' }}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Lade Diagramm...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-xl" style={{ height: '300px' }}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-red-600">
              <p>Fehler beim Laden der Diagramme</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 mb-6 animate-fade-in">
      <div className="bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300" style={{ height: '300px' }}>
        <Line data={salaryChartData} options={salaryChartOptions} />
      </div>
      <div className="bg-white rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300" style={{ height: '300px' }}>
        <Line data={rateChartData} options={rateChartOptions} />
      </div>
    </div>
  );
};

export default Charts; 