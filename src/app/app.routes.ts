import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(c => c.HomeComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(c => c.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(c => c.AboutComponent) },
  { path: 'sportxercise', loadComponent: () => import('./pages/sportxercise/sportxercise').then(c => c.SportxerciseComponent) },
  { path: 'events', loadComponent: () => import('./pages/events/events').then(c => c.EventsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/coming-soon/coming-soon').then(c => c.ComingSoonComponent) },
  { path: 'donate', loadComponent: () => import('./pages/coming-soon/coming-soon').then(c => c.ComingSoonComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFoundComponent) }
];
