import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        // Componente temporal inline para visualizar algo
        loadComponent: () => import('@angular/core').then(m => {
            @m.Component({ template: '<div class="p-4"><h2 class="text-2xl font-bold">Dashboard</h2><p>Bienvenido al Panel de Administración</p></div>', standalone: true })
            class DashboardPlaceholder { }
            return DashboardPlaceholder;
        })
    }
];
