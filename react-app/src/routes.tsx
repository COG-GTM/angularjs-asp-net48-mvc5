import { RouteObject } from 'react-router-dom';
import App from './pages/App';

/**
 * Mirrors the Angular router configuration in `src/app/app.routes.ts`, which
 * exports an empty `routes: Routes = []`. The Angular `App` component renders
 * the welcome layout above a `<router-outlet />`; here `App` is the layout
 * element with an `<Outlet />` and no child routes (the empty Angular array).
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [],
  },
];
