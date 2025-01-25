import { Component,inject } from '@angular/core';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { PuzzleService } from '../services/puzzle.service';
import { SignalType } from '../model/models';

@Component({
  selector: 'app-puzzle',
  imports: [

  ],host: {
    '(keydown)': 'puzzleData.buttonDown($event)',
  },
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css'
})
export class PuzzleComponent {
  protected puzzleData= inject(PuzzleService);
  constructor( private apiService: ApiDjangoService) { }

  async getPuzzleData(){
     await this.apiService.getPuzzles().subscribe((data) => {
      let dataParse = JSON.parse(JSON.stringify(data));
      this.puzzleData.puzzleDataRef = dataParse[0].dungeon;
      this.puzzleData.playeri_j = [dataParse[0].playerPos[0][0],dataParse[0].playerPos[0][1]];
      this.puzzleData.initialPlayeri_j = [dataParse[0].playerPos[0][0],dataParse[0].playerPos[0][1]];
      this.puzzleData.doorpoosition = dataParse[0].doorPos;
      this.puzzleData.enemyPosition = dataParse[0].enemyPos;
     }); 
  }

  getRow(aux:[]){
    return aux;
  }
  botonAbajo(event: KeyboardEvent){
      this.puzzleData.buttonDown(event);
  }
  reset(){
    this.puzzleData.resetPuzzle();
  }

}

