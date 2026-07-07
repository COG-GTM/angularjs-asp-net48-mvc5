import { version } from 'react';
import { getReactVersion } from './version';

describe('getReactVersion', () => {
  it('returns the React runtime version', () => {
    expect(getReactVersion()).toBe(version);
  });
});
