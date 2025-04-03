import { Routes } from '@angular/router';
import { FormPuzzlePetitionComponent } from './core/form-puzzle-petition/form-puzzle-petition.component';
import { PuzzleContainerComponent } from './core/puzzle-container/puzzle-container.component';
import { PuzzleGameComponent } from './core/puzzle-game/puzzle-game.component';
export const routes: Routes = [
  { path: 'Create-Puzzles', component: FormPuzzlePetitionComponent },
  { path: 'Puzzles', component: PuzzleContainerComponent },
  { path: 'Puzzles/:index', component: PuzzleGameComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'Create-Puzzles', pathMatch: 'full' },
];
