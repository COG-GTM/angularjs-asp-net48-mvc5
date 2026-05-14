import { routes } from './app.routes';

describe('routes', () => {
  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(routes)).toBe(true);
  });

  it('should be an empty array by default', () => {
    expect(routes.length).toBe(0);
  });
});
