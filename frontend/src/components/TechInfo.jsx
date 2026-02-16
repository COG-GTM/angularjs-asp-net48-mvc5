import React from 'react';

function TechInfo({ name, description, badge }) {
  return (
    <div className="tech-info">
      <div className="tech-info__header">
        <h3 className="tech-info__name">{name}</h3>
        <span className="tech-info__badge">{badge}</span>
      </div>
      <p className="tech-info__desc">{description}</p>
    </div>
  );
}

export default TechInfo;
