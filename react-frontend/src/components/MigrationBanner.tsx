import './MigrationBanner.css'

export function MigrationBanner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </div>
        <div className="banner-text">
          <h2 className="banner-title">Migration Complete</h2>
          <p className="banner-description">
            This application has been successfully migrated from <strong>AngularJS 1.x</strong> (end-of-life)
            to <strong>React 18</strong> with TypeScript and Vite. The legacy server-rendered Razor views
            have been replaced with a modern single-page application.
          </p>
        </div>
      </div>
      <div className="banner-stats">
        <div className="stat">
          <span className="stat-value">3</span>
          <span className="stat-label">Components Migrated</span>
        </div>
        <div className="stat">
          <span className="stat-value">0</span>
          <span className="stat-label">jQuery Dependencies</span>
        </div>
        <div className="stat">
          <span className="stat-value">100%</span>
          <span className="stat-label">TypeScript Coverage</span>
        </div>
      </div>
    </div>
  )
}
