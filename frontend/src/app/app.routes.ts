import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'user',
         loadChildren:() => import('./userSesion/userSesion.route'),
    },
    {
        path:'user',
        loadChildren:() => import('./core/core.route'),
    }
];
