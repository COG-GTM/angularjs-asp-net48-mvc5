/**
 * Mirrors Angular's `VERSION.full` from the original SPA. The migrated
 * components are framework-agnostic React now, so the version string that was
 * read from `@angular/core` is preserved here as a constant to keep the
 * rendered output (and its `data-testid` contract) identical to the Angular app.
 */
export const ANGULAR_VERSION = '21.2.0';
