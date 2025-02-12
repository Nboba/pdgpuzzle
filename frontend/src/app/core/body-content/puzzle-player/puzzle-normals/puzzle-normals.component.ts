import { Component } from '@angular/core';

import { PetitionPuzzleService } from '../../../services/petition-puzzle.service';
import{PuzzleComponent} from '../../../puzzle/puzzle.component';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'puzzle-normals',
  imports: [
    PuzzleComponent,
    MatGridListModule,
    
  ],
  templateUrl: './puzzle-normals.component.html',
  styleUrl: './puzzle-normals.component.css'
})
export class PuzzleNormalsComponent {
    protected puzzleData: any;
    constructor(private apiPetition: PetitionPuzzleService) { 
      this.apiPetition.getPuzzlesPlayer(5,1).subscribe((data: any) => {
          
          if(data.status==200){
            this.puzzleData = data.puzzlesData;
          }
      });
    }


}
