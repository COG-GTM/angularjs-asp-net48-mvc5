import { bootstrapErrorHandler } from './app/bootstrap-error-handler';

describe('bootstrapErrorHandler', () => {
  it('should log errors to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Bootstrap failed');
    bootstrapErrorHandler(error);
    expect(spy).toHaveBeenCalledWith(error);
    spy.mockRestore();
  });

  it('should handle string error messages', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    bootstrapErrorHandler('Something went wrong');
    expect(spy).toHaveBeenCalledWith('Something went wrong');
    spy.mockRestore();
  });

  it('should handle undefined errors', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    bootstrapErrorHandler(undefined);
    expect(spy).toHaveBeenCalledWith(undefined);
    spy.mockRestore();
  });
});
