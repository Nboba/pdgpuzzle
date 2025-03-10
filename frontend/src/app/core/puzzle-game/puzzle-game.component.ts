import { OnInit, Component,inject, signal, OnDestroy } from '@angular/core';
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
export class PuzzleGameComponent implements OnInit, OnDestroy {

  private readonly route = inject(ActivatedRoute);
  protected index:number=0;
  protected Matrix=signal<number[][]>([]);
  protected Playeri_j=signal<number[]>([]);
  protected EnemyPositions:number[][]=[];

  constructor(private gameService:PuzzleGameService,private puzzleLocalService:PuzzleLocalService){}

  ngOnInit(): void {
    this.index= Number(this.route.snapshot.paramMap.get('index'));
    let puzzleData={...this.puzzleLocalService.getPuzzle(this.index)};
    this.Matrix.set([...puzzleData.Matrix]);
    this.Playeri_j.set([...puzzleData.PlayerPostions]);
    this.EnemyPositions=[...puzzleData.EnemyPositions];
  }

  getColorRow(cell:number){
    return cellColors[cell];
  }

  botonAbajo(event: KeyboardEvent):void{
      let buttonDown=this.gameService.buttonDown(event,
                                 [...this.Matrix()],
                                 this.Playeri_j(),
                                 this.EnemyPositions);
      let move= buttonDown[0];
      let moveType=buttonDown[1];
      if(moveType ==='Move'){
        this.Matrix()[this.Playeri_j()[0]][this.Playeri_j()[1]]=0;
        this.Matrix()[move[0]][move[1]]=5;
        this.Playeri_j.set(move);
      }
      else if(moveType==='Enemy'){
        this.Matrix()[move[0]][move[1]]=0;
      }

  }

  ngOnDestroy(): void {
    this.Matrix.set(this.gameService.resetPuzzle(this.Matrix(),this.puzzleLocalService.getPuzzle(this.index).PlayerPostions,this.Playeri_j(),this.EnemyPositions));
  }

}


