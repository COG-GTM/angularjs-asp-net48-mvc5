import './MigrationTimeline.css'

interface Step {
  number: number
  title: string
  description: string
  tags: string[]
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Analyzed Legacy Codebase',
    description: 'Mapped AngularJS components, directives, Razor views, and ASP.NET bundling configuration.',
    tags: ['AngularJS', 'ASP.NET MVC 5', 'jQuery'],
  },
  {
    number: 2,
    title: 'Scaffolded React + Vite Project',
    description: 'Created a modern React 18 project with TypeScript, Vite, and component-scoped CSS.',
    tags: ['React 18', 'TypeScript', 'Vite 5'],
  },
  {
    number: 3,
    title: 'Migrated Components',
    description: 'Converted AngularJS directives and components to React functional components with hooks.',
    tags: ['Components', 'Hooks', 'JSX'],
  },
  {
    number: 4,
    title: 'Modernized UX',
    description: 'Added responsive layout, card-based design, modern typography, and interactive elements.',
    tags: ['Responsive', 'CSS Grid', 'UX'],
  },
]

export function MigrationTimeline() {
  return (
    <section className="section timeline-section">
      <div className="section-header">
        <h2 className="section-title">Migration Steps</h2>
        <p className="section-subtitle">How Devin modernized this application</p>
      </div>
      <div className="timeline">
        {STEPS.map((step) => (
          <div key={step.number} className="timeline-item">
            <div className="timeline-marker">
              <span className="timeline-number">{step.number}</span>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-description">{step.description}</p>
              <div className="timeline-tags">
                {step.tags.map((tag) => (
                  <span key={tag} className="timeline-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
