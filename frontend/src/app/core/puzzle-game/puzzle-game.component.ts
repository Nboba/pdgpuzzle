import { AfterContentInit, Component,inject, signal } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import { PuzzleGameService } from '../Services/puzzle-game.service';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { cellColors } from '../Models/constant-values';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle-game',
  imports: [
    MatGridListModule

  ],
  templateUrl: './puzzle-game.component.html',
  styleUrl: './puzzle-game.component.scss'
})
export class PuzzleGameComponent implements AfterContentInit {
  protected puzzleData:ResponsePuzzleModel={} as ResponsePuzzleModel;
  private readonly route = inject(ActivatedRoute);
  protected index:number=0;
  protected Matrix:number[][]=[];
  protected Playeri_j=signal<number[]>([]);

  constructor(private gameService:PuzzleGameService,private puzzleLocalService:PuzzleLocalService){}

  ngAfterContentInit(): void {
    this.index= Number(this.route.snapshot.paramMap.get('index'))??0;
    this.puzzleData=this.puzzleLocalService.getPuzzle(this.index);
    this.Matrix=this.puzzleData.Matrix;
    this.Playeri_j.set(this.puzzleData.PlayerPostions);
  }

  getColorRow(cell:number){
    return cellColors[cell];
  }

  botonAbajo(event: KeyboardEvent):void{
      let buttonDown=this.gameService.buttonDown(event,
                                 [...this.Matrix],
                                 this.Playeri_j(),
                                 this.puzzleData.EnemyPositions);
      let move= buttonDown[0];
      let moveType=buttonDown[1];
      if(moveType ==='Move'){
        this.Matrix[this.Playeri_j()[0]][this.Playeri_j()[1]]=0;
        this.Matrix[move[0]][move[1]]=5;
        this.Playeri_j.set(move);
      }
      else if(moveType==='Enemy'){
        this.Matrix[move[0]][move[1]]=0;
      }

  }

}


