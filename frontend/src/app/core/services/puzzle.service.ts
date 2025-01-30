import { Injectable,signal } from '@angular/core';
import { SignalType,keySignal } from '../model/models';
@Injectable({
  providedIn: 'root'
})
export class PuzzleMechanicsService {
    constructor() {}
    
  public resetPuzzle(puzzleDataRef:number[][],initialPlayeri_j:number[],playeri_j:number[],enemyPosition:number[][]):number[][]{
    puzzleDataRef[playeri_j[0]][playeri_j[1]]=0;
    puzzleDataRef[initialPlayeri_j[0]][initialPlayeri_j[1]]=5;
    enemyPosition.map((enemy:number[])=>{puzzleDataRef[enemy[0]][enemy[1]]=3});
    return puzzleDataRef;
  }

  public lookAhead(puzzleDataRef:number[][],playeri_j:number[],move:number[]):[number[],number]{
      let tile= [Number(playeri_j[0]) + move[0],Number(playeri_j[1]) + move[1]];
      let entity = Number(puzzleDataRef[tile[0]][tile[1]]);
      return [tile,entity];
  }
  public iceLiding(puzzleDataRef:number[][],playeri_j:number[],move:number[]): [number[][],number[]]{
      while(true){
        let tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move);
        let tile =tile_entity[0];
        let entity =tile_entity[1];
        if(entity===0 ){
          puzzleDataRef[playeri_j[0]][playeri_j[1]]=0;
          puzzleDataRef[tile[0]][tile[1]]=5;
          playeri_j = tile;
          puzzleDataRef=puzzleDataRef;
        }
        else{
          break;
        }
      
      }
      return [puzzleDataRef,playeri_j];
    }
  public step(puzzleDataRef:number[][],playeri_j:number[],move:number[]): [number[][],number[]]{
    let tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move);
    let tile =tile_entity[0];
    let entity =tile_entity[1];
    if(entity == 0){
      let puzzlePlayer=this.iceLiding(puzzleDataRef,playeri_j,move);
      puzzleDataRef=puzzlePlayer[0];
      playeri_j=puzzlePlayer[1];
    }
    else if(entity == 3){
      puzzleDataRef[tile[0]][tile[1]]=0;
    }
    return [puzzleDataRef,playeri_j];
  }
  public win(puzzleDataRef:number[][],playeri_j:number[],enemyPosition:number[][]):void{
      let win=SignalType.some((move:keySignal)=>{
        let tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move.move);
        let entity =tile_entity[1];
        if(entity==4){
          return true;
        }
        return false
      });

      if(win){
        setTimeout(()=>{
          alert("Ganaste");
        },1000);
      }
    
  }

  public buttonDown(event: KeyboardEvent,puzzleDataRef:number[][],playeri_j:number[],enemyPosition:number[][]):[number[][],number[]]{
    let move =SignalType.find((element)=>element.key==event.key)?.move;
    if(move){
      let puzzleStep=this.step(puzzleDataRef,playeri_j,move)
      puzzleDataRef=puzzleStep[0];
      playeri_j=puzzleStep[1];
      let leftEnemys=this.checkEnemys(puzzleDataRef,enemyPosition);
      if(!leftEnemys){
        this. win(puzzleDataRef,playeri_j,enemyPosition);
      }
    }
    return [puzzleDataRef,playeri_j];
  }

  public checkEnemys(puzzleDataRef:number[][],enemyPosition:number[][]):boolean{
    return enemyPosition.some((enemy:number[])=>{
      if(puzzleDataRef[enemy[0]][enemy[1]]==3){
        return true;
      }
      return false;
    });
  }

}
