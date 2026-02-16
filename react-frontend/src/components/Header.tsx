import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <span className="logo-icon">⚛</span>
          </div>
          <div>
            <h1 className="header-title">Application Dashboard</h1>
            <p className="header-tagline">Migrated from AngularJS to React 18</p>
          </div>
        </div>
        <nav className="header-nav">
          <span className="nav-badge nav-badge--live">React 18</span>
          <span className="nav-badge nav-badge--legacy">AngularJS Retired</span>
        </nav>
      </div>
    </header>
  )
}
