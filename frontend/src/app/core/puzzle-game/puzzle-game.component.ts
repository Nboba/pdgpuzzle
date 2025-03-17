import { OnInit, Component,inject, signal, OnDestroy } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { PuzzleGameService } from '../Services/puzzle-game.service';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { cellColors } from '../Models/constant-values';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-puzzle-game',
  imports: [
    MatGridListModule,
    MatIcon

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
  protected NroMovimientos : number= 0;
  protected NroSoluciones:number=0;

  protected isGameActive=signal<boolean>(false);
  protected time=signal<number>(0);
  protected moves=signal<number>(0);
 protected interval:any;
  constructor(private gameService:PuzzleGameService,private puzzleLocalService:PuzzleLocalService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.index= Number(this.route.snapshot.paramMap.get('index'));
    let puzzleData={...this.puzzleLocalService.getPuzzle(this.index)};
    this.Matrix.set([...puzzleData.Matrix]);
    this.Playeri_j.set([...puzzleData.PlayerPostions]);
    this.EnemyPositions=[...puzzleData.EnemyPositions];
    this.NroMovimientos=puzzleData.NMoves;
    this.NroSoluciones=puzzleData.NSolutions
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
      if(moveType ==='Win'){
        this.isGameActive.set(false);
        clearInterval(this.interval);
      }
      else if(moveType ==='Move'){
        this.Matrix()[this.Playeri_j()[0]][this.Playeri_j()[1]]=0;
        this.Matrix()[move[0]][move[1]]=5;
        this.Playeri_j.set(move);
      }
      else if(moveType==='Enemy'){
        this.Matrix()[move[0]][move[1]]=0;
      }
        this.moves.set(this.moves()+1);
  }

  ngOnDestroy(): void {
    this.Matrix.set(this.gameService.resetPuzzle(this.Matrix(),this.puzzleLocalService.getPuzzle(this.index).PlayerPostions,this.Playeri_j(),this.EnemyPositions));
  }

  startGame(){
    this.isGameActive.set(!this.isGameActive());
    if(this.isGameActive()){
      this.interval = setInterval(() => {
        this.time.set(this.time()+1);
      },1000)
    }
    else{
      clearInterval(this.interval);
    }
  }

  resetGame(){
    this.Matrix.set(this.gameService.resetPuzzle(this.Matrix(),this.puzzleLocalService.getPuzzle(this.index).PlayerPostions,this.Playeri_j(),this.EnemyPositions));
    this.moves.set(0);
    this.time.set(0);
    this.Playeri_j.set(this.puzzleLocalService.getPuzzle(this.index).PlayerPostions);
  }
  back(){
    this.resetGame();
    this.isGameActive.set(false);
    this.router.navigate(['/Puzzles']);
  }
}


