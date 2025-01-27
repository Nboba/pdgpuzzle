import { Routes } from '@angular/router';

export default [
    { path: 'puzzle',
        loadComponent:() => 
            import('./puzzle/puzzle.component').then((m) => m.PuzzleComponent ),
    },
    { path: 'petition',
        loadComponent:() => 
            import('./formulario-puzzle/formulario-puzzle.component').then((m) => m.FormularioPuzzleComponent ),
    },

] as Routes;

