import { Routes } from '@angular/router';
import { catalogRoutes } from './features/user/catalog/catalog.routes';

export const routes: Routes = [
  {
    path: '',
    children: catalogRoutes,
  },
];
