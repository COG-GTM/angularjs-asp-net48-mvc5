import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'test-component', pathMatch: 'full' },
  { path: 'test-component', loadComponent: () => import('./components/test/test.component').then(m => m.TestComponent) },
  { path: 'test-directive', loadComponent: () => import('./components/test-directive/test-directive.component').then(m => m.TestDirectiveComponent) },
  { path: '**', redirectTo: 'test-component' }
];
