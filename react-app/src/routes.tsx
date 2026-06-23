import { RouteObject } from 'react-router-dom';
import App from './pages/App';

/**
 * Mirrors the Angular router configuration in `src/app/app.routes.ts`, which
 * exports an empty `routes: Routes = []`. In Angular the `App` component renders
 * the welcome layout above a `<router-outlet />` for ANY URL (an unmatched path
 * just leaves the outlet empty while the shell still renders). To reproduce that
 * behaviour, `App` is the layout element (with an empty `<Outlet />`, the empty
 * Angular routes array) and is mounted on a catch-all path so every URL renders
 * the shell rather than a 404.
 */
export const routes: RouteObject[] = [
  {
    path: '*',
    element: <App />,
    children: [],
  },
];
