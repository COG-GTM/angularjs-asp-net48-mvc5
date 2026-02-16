import React, { useEffect, useState } from 'react';

function VersionCard({ label, version, testId, icon, accentColor }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`version-card ${visible ? 'version-card--visible' : ''}`}
      style={{ '--accent': accentColor }}
    >
      <span className="version-card__icon">{icon}</span>
      <span className="version-card__label">{label}</span>
      <span className="version-card__value" data-testid={testId}>
        {version}
      </span>
    </div>
  );
}

export default VersionCard;
