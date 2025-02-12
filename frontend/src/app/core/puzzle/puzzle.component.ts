import { Component,inject ,input} from '@angular/core';
import { OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { PuzzleMechanicsService } from '../services/puzzle.service';
import { cellColors } from '../model/models';
import { RowComponent } from './row/row.component';

@Component({
  selector: 'puzzle',
  imports: [
    RowComponent,
    MatGridListModule,


  ],host: {
    '(keydown)': 'botonAbajo($event)',
  },
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css'
})
export class PuzzleComponent implements OnInit{
  protected puzzleData= inject(PuzzleMechanicsService);
  public puzzleMatriz=input.required<number[][]>();
  public playeri_j=input<number[]>([]);
  public initialPlayeri_j=input<number[]>([]);
  public doorPosition=input<number[]>([]);
  public enemyPosition=input<number[][]>([]);
  public puzzleId=input.required<number>();
  protected modificableMatriz:number[][]=[];
  protected modificablePlayeri_j:number[]=[];
  public isPuzzleActiva=input<boolean>(false);

  ngOnInit(){
    this.modificableMatriz=this.puzzleMatriz();
    if(this.playeri_j()){
      this.modificablePlayeri_j=this.initialPlayeri_j();
    }
    else{
        this.modificablePlayeri_j=[];
      }

  }

  getRow(aux:[]){
    return aux;
  }

  botonAbajo(event: KeyboardEvent){
    if(this.isPuzzleActiva()){
      let buttonDown=this.puzzleData.buttonDown(event,
                                 this.puzzleMatriz(),
                                 this.playeri_j(),
                                 this.enemyPosition());
      this.modificableMatriz=buttonDown[0];
      this.modificablePlayeri_j=buttonDown[1];
    }
  }
  reset(){
    this.modificableMatriz = this.puzzleData.resetPuzzle(this.puzzleMatriz(),
                                                    this.initialPlayeri_j(),
                                                    this.playeri_j(),
                                                    this.enemyPosition());
    this.modificablePlayeri_j = this.initialPlayeri_j();
  }
  getColorRow(cell:number){
    
    return cellColors[cell];
  }

}

