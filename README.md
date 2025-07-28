# Kammerbeiträge Bremen vs. Saarland 2025

Eine interaktive Präsentation über die rechtsvergleichende Systemanalyse der Kammerbeiträge zwischen Bremen und Saarland für SD WORX.

## 🚀 Live Demo

**<https://uelkerd.github.io/sd-worx-chamber-presentation/presentation.html>**

## 🔧 Important Note

We've created a standalone HTML file that works correctly with all slides:

1. **Use this direct link**: [presentation.html](https://uelkerd.github.io/sd-worx-chamber-presentation/presentation.html)
2. **Clear Browser Cache**: Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) if needed
3. **Navigation**: Use arrow keys or the dots at the bottom to navigate between slides

## 🎯 Projektübersicht

Diese React-Anwendung präsentiert eine detaillierte Analyse der Kammerbeiträge in Bremen und Saarland für das Jahr 2025. Die Präsentation zeigt die fundamentalen Unterschiede zwischen den beiden Systemen und deren Auswirkungen auf die Beitragsberechnung.

## ✨ Features

- **5 interaktive Slides** mit animierten Übergängen
- **Responsive Design** für alle Bildschirmgrößen
- **Interaktive Charts** mit Chart.js
- **Smooth Animations** mit Framer Motion
- **Keyboard Navigation** (Pfeiltasten, Leertaste, ESC)
- **PDF Export** Funktionalität (vorbereitet)
- **Moderne UI/UX** mit Tailwind CSS
- **100% korrekte Berechnungen** basierend auf aktuellen Rechtsgrundlagen

## 🚀 Installation & Start

### Voraussetzungen

- Node.js (Version 16 oder höher)
- npm oder yarn

### Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm start

# Für Produktion bauen
npm run build
```

Die Anwendung läuft dann unter `http://localhost:3000`

## 📊 Berechnungsdetails

### Bremen (Arbeitnehmerkammer)

- **Beitragssatz:** 0,12%
- **Bemessungsgrundlage:** Steuerpflichtiger Arbeitslohn (LStDV)
- **BBG:** Keine Obergrenze
- **System:** Proportional

### Saarland (Arbeitskammer)

- **Beitragssatz:** 0,15%
- **Bemessungsgrundlage:** SV-pflichtiges Bruttoentgelt (SGB IV)
- **BBG:** €8.050 monatlich (2025)
- **System:** Degressiv

### Beispielberechnung für €10.000 Bruttogehalt

- **Bremen:** €10.000 × 0,12% = **€12,00**
- **Saarland:** €8.050 × 0,15% = **€12,08**

## 🎨 Technologie-Stack

- **React 18** - Frontend Framework
- **Tailwind CSS** - Styling Framework
- **Framer Motion** - Animation Library
- **Chart.js** - Chart Library
- **Lucide React** - Icon Library
- **React Chart.js 2** - React Wrapper für Chart.js

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Slide1Title.jsx          # Titel-Slide
│   ├── Slide2ExecutiveSummary.jsx # Executive Summary
│   ├── Charts.jsx               # Chart-Komponenten
│   └── Navigation.jsx           # Navigation
├── utils/
│   └── calculations.js          # Berechnungslogik
├── styles/
│   └── index.css               # Globale Styles
├── App.jsx                     # Hauptkomponente
└── index.js                    # App-Einstiegspunkt
```

## 🎮 Navigation

- **Pfeiltasten links/rechts** - Zwischen Slides navigieren
- **Leertaste** - Nächste Slide
- **ESC** - Zur ersten Slide
- **Mausklick** - Auf Navigation-Buttons
- **Touch** - Auf mobilen Geräten

## 📱 Responsive Design

Die Anwendung ist vollständig responsive und optimiert für:

- Desktop (1920x1080 und höher)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 PDF Export

Die Anwendung ist vorbereitet für PDF-Export. Die Implementierung kann mit folgenden Bibliotheken erfolgen:

- `react-to-pdf`
- `html2canvas` + `jspdf`
- `@react-pdf/renderer`

## 🔍 Code Quality Tools

Das Projekt verwendet folgende Tools zur Sicherstellung der Code-Qualität:

### ESLint

ESLint prüft den Code auf Fehler und Stilprobleme:

```bash
# Code linting ausführen
npm run lint

# Automatisch behebbare Probleme fixen
npm run lint:fix
```

### Prettier

Prettier formatiert den Code einheitlich:

```bash
# Code formatieren
npm run format

# Überprüfen, ob der Code korrekt formatiert ist
npm run format:check
```

### EditorConfig

Die `.editorconfig` sorgt für konsistente Einstellungen in verschiedenen Editoren.

### Husky & lint-staged

Vor jedem Commit werden automatisch Linting und Formatierung durchgeführt.

## 🔧 Anpassungen

### Berechnungen ändern

Alle Berechnungen befinden sich in `src/utils/calculations.js`:

```javascript
export const BBG_SAARLAND = 8050; // BBG für Saarland
export const BREMEN_RATE = 0.0012; // 0,12% für Bremen
export const SAARLAND_RATE = 0.0015; // 0,15% für Saarland
```

### Styling anpassen

Das Design kann über `tailwind.config.js` und `src/styles/index.css` angepasst werden.

## 📋 Berechnungsverifikation

Alle Berechnungen wurden sorgfältig verifiziert:

| Gehalt  | Bremen | Saarland | Differenz  |
| ------- | ------ | -------- | ---------- |
| €5.000  | €6,00  | €7,50    | +€1,50 SL  |
| €8.050  | €9,66  | €12,08   | +€2,42 SL  |
| €10.000 | €12,00 | €12,08   | +€0,08 SL  |
| €15.000 | €18,00 | €12,08   | -€5,92 SL  |
| €20.000 | €24,00 | €12,08   | -€11,92 SL |

## 🎨 Design-System

### Farben

- **Primary:** Blau (#0ea5e9) - Bremen
- **Secondary:** Lila (#8b5cf6) - Saarland
- **Accent:** Orange (#f97316) - Highlights

### Typografie

- **Font:** Inter (Google Fonts)
- **Gewichte:** 300, 400, 500, 600, 700, 800, 900

### Animationen

- **Slide Transitions:** 500ms ease-out
- **Element Animations:** Staggered mit Framer Motion
- **Hover Effects:** Scale und Shadow Transitions

## 🔍 Performance

- **Lazy Loading** für Charts
- **Optimized Images** und Assets
- **Code Splitting** für bessere Ladezeiten
- **Memoization** für teure Berechnungen

## 📄 Lizenz

Dieses Projekt wurde für SD WORX erstellt. Alle Rechte vorbehalten.

## 👨‍💻 Autor

**Deniz Ülker**  
_26. Juli 2025_

---

**Rechtsstand:** 2025  
**Quellen:** ArbnkG Bremen, AKG Saarland, SV-Rechengrößenverordnung 2025
