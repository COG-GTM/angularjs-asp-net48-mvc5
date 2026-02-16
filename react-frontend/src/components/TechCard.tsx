import './TechCard.css'

interface TechCardProps {
  name: string
  version: string
  description: string
  status: 'active' | 'deprecated' | 'replaced'
  icon: string
  color: string
}

const STATUS_CONFIG = {
  active: { label: 'Active', className: 'status--active' },
  deprecated: { label: 'Deprecated', className: 'status--deprecated' },
  replaced: { label: 'Replaced', className: 'status--replaced' },
}

export function TechCard({ name, version, description, status, icon, color }: TechCardProps) {
  const statusInfo = STATUS_CONFIG[status]

  return (
    <div className={`tech-card ${status === 'active' ? 'tech-card--active' : 'tech-card--legacy'}`}>
      <div className="tech-card-header">
        <div className="tech-card-icon" style={{ background: color }}>
          {icon}
        </div>
        <div className="tech-card-meta">
          <h3 className="tech-card-name">{name}</h3>
          <span className="tech-card-version">v{version}</span>
        </div>
        <span className={`tech-card-status ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      </div>
      <p className="tech-card-description">{description}</p>
    </div>
  )
}
