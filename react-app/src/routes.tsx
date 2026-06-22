import type { RouteObject } from 'react-router-dom';

/**
 * Mirrors the Angular SPA's `routes` array (src/app/app.routes.ts), which is
 * currently empty. These are rendered into the `<Outlet />` of the App shell,
 * matching Angular's `<router-outlet />`. Add child routes here as the app
 * grows to preserve the same URL structure.
 */
export const childRoutes: RouteObject[] = [];
