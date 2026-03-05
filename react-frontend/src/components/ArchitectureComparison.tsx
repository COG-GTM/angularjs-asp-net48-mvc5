import './ArchitectureComparison.css'

interface ArchRow {
  aspect: string
  before: string
  after: string
}

const ROWS: ArchRow[] = [
  { aspect: 'UI Framework', before: 'AngularJS 1.8 (EOL)', after: 'React 18 with Hooks' },
  { aspect: 'Language', before: 'JavaScript (ES5)', after: 'TypeScript 5.2 (strict)' },
  { aspect: 'Build Tool', before: 'ASP.NET Bundling', after: 'Vite 5 with HMR' },
  { aspect: 'Component Model', before: 'Directives + $scope', after: 'Functional Components' },
  { aspect: 'DOM Manipulation', before: 'jQuery 3.6', after: 'React Virtual DOM' },
  { aspect: 'Styling', before: 'Global CSS (5 lines)', after: 'Component-scoped CSS' },
  { aspect: 'Server Rendering', before: 'Razor Views (.cshtml)', after: 'SPA + API-ready' },
  { aspect: 'Dev Experience', before: 'Manual reload', after: 'Instant HMR (<100ms)' },
]

export function ArchitectureComparison() {
  return (
    <section className="section comparison-section">
      <div className="section-header">
        <h2 className="section-title">Architecture Comparison</h2>
        <p className="section-subtitle">Before and after the modernization</p>
      </div>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th className="col-before">Before (Legacy)</th>
              <th className="col-after">After (Modern)</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.aspect}>
                <td className="cell-aspect">{row.aspect}</td>
                <td className="cell-before">{row.before}</td>
                <td className="cell-after">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
