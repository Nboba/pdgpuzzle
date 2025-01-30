import { Routes } from '@angular/router';

export default [
    
    { path: 'puzzle',
        loadComponent:() => 
            import('./puzzle/puzzle.component').then((m) => m.PuzzleComponent ),
        title: 'Puzzle',
    },
    { path: 'petition',
        loadComponent:() => 
            import('./formulario-puzzle/formulario-puzzle.component').then((m) => m.FormularioPuzzleComponent ),
        title: 'FormularioPuzzle',
    },
    { path: 'panel',
        loadComponent:() => 
            import('./body-content/body-content.component').then((m) => m.BodyContentComponent ),
        title: 'Panel',
    },
    { path: '',   redirectTo: 'panel', pathMatch: 'full' },
] as Routes;

