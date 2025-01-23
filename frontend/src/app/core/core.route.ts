import { Routes } from '@angular/router';

export default [
    { path: 'puzzle',
        loadComponent:() => 
            import('./puzzle/puzzle.component').then((m) => m.PuzzleComponent ),
    },

] as Routes;

