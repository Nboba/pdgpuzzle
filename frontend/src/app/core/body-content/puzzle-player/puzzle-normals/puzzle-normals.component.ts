import { Component } from '@angular/core';

import { PetitionPuzzleService } from '../../../services/petition-puzzle.service';

@Component({
  selector: 'puzzle-normals',
  imports: [],
  templateUrl: './puzzle-normals.component.html',
  styleUrl: './puzzle-normals.component.css'
})
export class PuzzleNormalsComponent {
    
    constructor(private apiPetition: PetitionPuzzleService) { 
      this.apiPetition.getPuzzlesPlayer(5,1).subscribe((data: any) => {
          console.log(data);
      });
    }


}
