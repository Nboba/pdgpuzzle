import { Component,inject } from '@angular/core';

import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { PuzzleMechanicsService } from '../services/puzzle.service';
import { SignalType } from '../model/models';
import { RowComponent } from './row/row.component';

@Component({
  selector: 'app-puzzle',
  imports: [
    RowComponent

  ],host: {
    '(keydown)': 'botonAbajo($event)',
  },
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css'
})
export class PuzzleComponent {
  protected puzzleData= inject(PuzzleMechanicsService);
  protected puzzleMatriz:number[][]=[];
  protected playeri_j:number[]=[];
  protected initialPlayeri_j:number[]=[];
  protected doorpoosition:number[]=[];
  protected enemyPosition:number[][]=[];
  protected puzzleId:number=-1;
  constructor( private apiService: ApiDjangoService) { }

  async getPuzzleData(){
     await this.apiService.getPuzzles().subscribe((data) => {
      let dataParse = JSON.parse(JSON.stringify(data));
      console.log(dataParse);
      this.puzzleMatriz = dataParse[0].dungeon;
      this.playeri_j = [dataParse[0].playerPos[0][0],dataParse[0].playerPos[0][1]];
      this.initialPlayeri_j = [dataParse[0].playerPos[0][0],dataParse[0].playerPos[0][1]];
      this.doorpoosition = dataParse[0].doorPos;
      this.enemyPosition = dataParse[0].enemyPos;
     }); 
  }

  getRow(aux:[]){
    return aux;
  }

  botonAbajo(event: KeyboardEvent){
      let buttonDown=this.puzzleData.buttonDown(event,
                                 this.puzzleMatriz,
                                 this.playeri_j,
                                 this.enemyPosition);
      this.puzzleMatriz=buttonDown[0];
      this.playeri_j=buttonDown[1];
  }
  reset(){
    this.puzzleMatriz = this.puzzleData.resetPuzzle(this.puzzleMatriz,
                                                    this.initialPlayeri_j,
                                                    this.playeri_j,
                                                    this.enemyPosition);
    this.playeri_j = this.initialPlayeri_j;
  }

}

