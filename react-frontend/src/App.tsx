import { Header } from './components/Header'
import { MigrationBanner } from './components/MigrationBanner'
import { TechCard } from './components/TechCard'
import { ArchitectureComparison } from './components/ArchitectureComparison'
import { MigrationTimeline } from './components/MigrationTimeline'
import './App.css'

const TECH_STACK = [
  {
    name: 'React',
    version: '18.2.0',
    description: 'Modern component-based UI library with hooks, concurrent features, and a vibrant ecosystem.',
    status: 'active' as const,
    icon: 'R',
    color: '#61dafb',
  },
  {
    name: 'TypeScript',
    version: '5.2',
    description: 'Strongly-typed JavaScript superset providing compile-time safety and better developer experience.',
    status: 'active' as const,
    icon: 'TS',
    color: '#3178c6',
  },
  {
    name: 'Vite',
    version: '5.0',
    description: 'Next-generation build tool with instant HMR, fast cold starts, and optimized production builds.',
    status: 'active' as const,
    icon: 'V',
    color: '#646cff',
  },
  {
    name: 'AngularJS',
    version: '1.8.3',
    description: 'Legacy framework — end-of-life since December 2021. Replaced by this modern React application.',
    status: 'deprecated' as const,
    icon: 'Ng',
    color: '#dd1b16',
  },
  {
    name: 'jQuery',
    version: '3.6.3',
    description: 'Legacy DOM manipulation library — no longer needed with React\'s declarative rendering model.',
    status: 'deprecated' as const,
    icon: '$',
    color: '#0769ad',
  },
  {
    name: 'ASP.NET MVC 5',
    version: '4.8',
    description: 'Server-side rendering framework. Backend APIs retained; Razor views replaced by React SPA.',
    status: 'replaced' as const,
    icon: '.N',
    color: '#512bd4',
  },
]

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <MigrationBanner />

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-subtitle">
              Current and legacy technologies in this application
            </p>
          </div>
          <div className="tech-grid">
            {TECH_STACK.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </div>
        </section>

        <ArchitectureComparison />
        <MigrationTimeline />
      </main>

      <footer className="footer">
        <p>
          Modernized with Devin AI — Migrated from AngularJS 1.x to React 18
        </p>
      </footer>
    </div>
  )
}

export default App
