import { Component,inject } from '@angular/core';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { Puzzle } from '../../userSesion/models/puzzle-model';

@Component({
  selector: 'app-puzzle',
  imports: [

  ],host: {
    '(keydown)': 'botonAbajo($event)',
  },
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css'
})
export class PuzzleComponent {
  protected apiService= inject(ApiDjangoService);
  protected puzzleData:Puzzle[]=[];
  protected playeri_j=[0,0];

  async getPuzzleData(){
     await this.apiService.getPuzzles().subscribe((data) => {
      this.puzzleData = JSON.parse(JSON.stringify(data));
      console.log(this.puzzleData);
     }); 
  }

  getRow(aux:[]){
    return aux;
  }
  botonAbajo(event: KeyboardEvent){
    console.log('abajo',event);
  }

}

