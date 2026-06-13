import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(c => c.HomeComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(c => c.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(c => c.AboutComponent) },
  { path: 'sportxercise', loadComponent: () => import('./pages/sportxercise/sportxercise').then(c => c.SportxerciseComponent) },
  { path: 'events', loadComponent: () => import('./pages/events/events').then(c => c.EventsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(c => c.ContactComponent) },
  { path: 'donate', loadComponent: () => import('./pages/donate/donate').then(c => c.DonateComponent) },
  { path: 'thank-you-contact', loadComponent: () => import('./pages/thank-you-contact/thank-you-contact').then(c => c.ThankYouContactComponent) },
  { path: 'thank-you-donation', loadComponent: () => import('./pages/thank-you-donation/thank-you-donation').then(c => c.ThankYouDonationComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFoundComponent) }
];
