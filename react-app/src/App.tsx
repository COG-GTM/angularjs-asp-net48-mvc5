import { BrowserRouter, useRoutes, type RouteObject } from 'react-router-dom';
import './App.css';
import { Shell } from './Shell';
import { childRoutes } from './routes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Shell />,
    children: childRoutes,
  },
];

const AppRoutes = () => useRoutes(routes);

/**
 * Root of the migrated React app. Replaces Angular's `AppModule` +
 * `RouterModule.forRoot(routes)` bootstrap. The `Shell` renders the welcome
 * page (the former Angular `App` template) and hosts the router `<Outlet />`.
 */
export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
