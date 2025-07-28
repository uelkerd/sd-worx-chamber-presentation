// This script enhances the PDF export functionality
// to ensure charts are properly rendered in the exported PDF

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log('PDF export enhancement script loaded');
  
  // Enhance the PDF export function
  window.exportPDF = async function() {
    console.log('Enhanced PDF export function called');
    
    // Show loading indicator
    const loadingEl = document.createElement('div');
    loadingEl.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';
    loadingEl.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-2xl text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p class="text-lg font-medium">PDF wird erstellt...</p>
        <p class="text-sm text-gray-500 mt-2">Bitte warten Sie, dieser Vorgang kann einige Sekunden dauern.</p>
      </div>
    `;
    document.body.appendChild(loadingEl);

    try {
      // Remember current slide
      const originalSlide = currentSlide;

      // Create a container for all slides
      const pdfContainer = document.createElement('div');
      pdfContainer.id = 'pdf-container';
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '0';
      pdfContainer.style.width = '1200px'; // Fixed width for better rendering
      document.body.appendChild(pdfContainer);

      // Clone all slides and make them visible
      for (let i = 0; i < totalSlides; i++) {
        const slide = document.getElementById(`slide-${i}`);
        const slideClone = slide.cloneNode(true);
        slideClone.id = `pdf-slide-${i}`;
        slideClone.style.display = 'flex';
        slideClone.style.pageBreakAfter = 'always';
        slideClone.style.height = '100vh';
        slideClone.style.width = '100%';
        pdfContainer.appendChild(slideClone);
      }

      // Remove navigation from PDF
      const navElements = pdfContainer.querySelectorAll('nav');
      navElements.forEach(nav => nav.remove());

      // Re-render charts in the PDF container with timeout to ensure proper rendering
      await new Promise(resolve => {
        setTimeout(() => {
          console.log('Re-rendering charts for PDF export');
          
          // Chart 1: Contribution by Salary
          const contributionCanvas = pdfContainer.querySelector('#contributionChart');
          if (contributionCanvas) {
            console.log('Re-rendering contribution chart');
            new Chart(contributionCanvas, {
              type: 'line',
              data: {
                labels: ['€5.000', '€8.050', '€10.000', '€15.000', '€20.000', '€25.000', '€30.000'],
                datasets: [
                  {
                    label: 'Bremen (unbegrenzt)',
                    data: [6, 9.66, 12, 18, 24, 30, 36],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.1
                  },
                  {
                    label: 'Saarland (gedeckelt)',
                    data: [7.5, 12.08, 12.08, 12.08, 12.08, 12.08, 12.08],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    fill: true,
                    tension: 0.1
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // Disable animations for PDF
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Beitrag in €'
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': ' + context.raw + '€';
                      }
                    }
                  }
                }
              }
            });
          }
          
          // Chart 2: Effective Rate
          const effectiveRateCanvas = pdfContainer.querySelector('#effectiveRateChart');
          if (effectiveRateCanvas) {
            console.log('Re-rendering effective rate chart');
            new Chart(effectiveRateCanvas, {
              type: 'line',
              data: {
                labels: ['€5.000', '€8.050', '€10.000', '€15.000', '€20.000', '€25.000', '€30.000'],
                datasets: [
                  {
                    label: 'Bremen (proportional)',
                    data: [0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                  },
                  {
                    label: 'Saarland (degressiv)',
                    data: [0.15, 0.15, 0.12, 0.08, 0.06, 0.048, 0.04],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // Disable animations for PDF
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Effektiver Beitragssatz in %'
                    },
                    ticks: {
                      callback: function(value) {
                        return value.toFixed(2) + '%';
                      }
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': ' + context.raw.toFixed(2) + '%';
                      }
                    }
                  }
                }
              }
            });
          }
          
          // Wait a bit longer for charts to fully render
          setTimeout(resolve, 2000);
        }, 1000);
      });

      // Configure PDF options with improved settings
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'SD_WORX_Kammerbeitraege_Bremen_vs_Saarland_2025.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          allowTaint: true,
          foreignObjectRendering: true,
          logging: true, // Enable logging
          dpi: 300, // Higher DPI
          imageTimeout: 0, // No timeout
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
      };

      // Generate PDF with an additional delay to ensure charts are fully rendered
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Generating PDF...');
      await html2pdf().from(pdfContainer).set(opt).save();

      // Clean up
      document.body.removeChild(pdfContainer);

      // Show success message
      loadingEl.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-2xl text-center">
          <div class="bg-green-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-lg font-medium text-green-600">PDF erfolgreich erstellt!</p>
          <p class="text-sm text-gray-500 mt-2">Der Download sollte automatisch starten.</p>
          <button class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors" onclick="document.body.removeChild(this.parentNode.parentNode.parentNode)">Schließen</button>
        </div>
      `;

      // Auto-close the success message after 3 seconds
      setTimeout(() => {
        if (document.body.contains(loadingEl)) {
          document.body.removeChild(loadingEl);
        }
      }, 3000);
    } catch (error) {
      console.error('PDF export error:', error);

      // Show error message
      loadingEl.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-2xl text-center">
          <div class="bg-red-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p class="text-lg font-medium text-red-600">Fehler beim PDF-Export</p>
          <p class="text-sm text-gray-500 mt-2">Bitte versuchen Sie es erneut oder nutzen Sie die Druckfunktion (Strg+P).</p>
          <button class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors" onclick="document.body.removeChild(this.parentNode.parentNode.parentNode)">Schließen</button>
        </div>
      `;
    }
  };
});

console.log('PDF export enhancement script ready'); 