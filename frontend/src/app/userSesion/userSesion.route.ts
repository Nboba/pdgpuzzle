import { Routes } from '@angular/router';

export default [
    { path: 'register',
        loadComponent:() => 
            import('./register_form/register.component').then((m) => m.RegisterComponent ),
    },
    { path: 'login', loadComponent:() => 
        import('./login_form/login.component').then((m) => m.LoginComponent),
     },
    { path: '',loadComponent:() => 
        import('./user_sesion/usersesion.component').then((m) => m.UserSesionComponent ),
    },
] as Routes;

