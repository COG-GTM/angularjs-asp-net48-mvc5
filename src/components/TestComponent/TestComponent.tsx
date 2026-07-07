import { getReactVersion } from '../../utils/version';

export default function TestComponent() {
  return (
    <div data-testid="react-version" className="test-component">
      React Version: {getReactVersion()}
    </div>
  );
}
