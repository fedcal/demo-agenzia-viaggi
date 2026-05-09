import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Atlante Viaggi Boutique — Viaggi su misura per esploratori curiosi'
  },
  {
    path: 'destinazioni',
    loadComponent: () =>
      import('./pages/destinazioni/destinazioni.component').then((m) => m.DestinazioniComponent),
    title: 'Destinazioni — Atlante Viaggi Boutique'
  },
  {
    path: 'chi-siamo',
    loadComponent: () =>
      import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Atlante Viaggi Boutique'
  },
  {
    path: 'viaggi-firma',
    loadComponent: () =>
      import('./pages/viaggi-firma/viaggi-firma.component').then((m) => m.ViaggiFiremaComponent),
    title: 'Viaggi Firma — Atlante Viaggi Boutique'
  },
  {
    path: 'contatti',
    loadComponent: () =>
      import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e Preventivo — Atlante Viaggi Boutique'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
