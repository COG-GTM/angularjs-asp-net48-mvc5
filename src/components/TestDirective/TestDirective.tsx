import { getReactVersion } from '../../utils/version';

export default function TestDirective() {
  return (
    <div data-testid="react-version-directive" className="test-directive">
      React Version: {getReactVersion()}
    </div>
  );
}
