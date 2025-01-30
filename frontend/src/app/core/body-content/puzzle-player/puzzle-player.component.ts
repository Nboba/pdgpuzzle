import { Component } from '@angular/core';

import { PuzzleNormalsComponent } from './puzzle-normals/puzzle-normals.component';

@Component({
  selector: 'puzzle-player',
  imports: [
    PuzzleNormalsComponent,
  ],
  templateUrl: './puzzle-player.component.html',
  styleUrl: './puzzle-player.component.css'
})
export class PuzzlePlayerComponent {

}
