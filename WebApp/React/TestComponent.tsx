import React, { useState, useEffect } from 'react';

function TestComponent() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    setVersion(React.version);
  }, []);

  return (
    <div data-testid="react-version" className="test-component">
      React Version: {version}
    </div>
  );
}

export default TestComponent;
