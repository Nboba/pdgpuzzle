import { Injectable } from '@angular/core';
import { SignalType } from '../../Models/constant-values';
import { keySignal } from '../../Models/interfaces-puzzle';

@Injectable({
  providedIn: 'root'
})
export class MechanicPuzzleService {



    public lookAhead(puzzleDataRef:number[][],playeri_j:number[],move:number[]):[number[],number]{
        const tile= [Number(playeri_j[0]) + move[0],Number(playeri_j[1]) + move[1]];
        const entity = Number(puzzleDataRef[tile[0]][tile[1]]);
        return [tile,entity];
    }

    public iceLiding(puzzleDataRef:number[][],playeri_j:number[],move:number[]): [number[][],number[]]{
        while(true){
          const tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move);
          const tile =tile_entity[0];
          const entity =tile_entity[1];
          if(entity===0 ){
            puzzleDataRef[playeri_j[0]][playeri_j[1]]=0;
            puzzleDataRef[tile[0]][tile[1]]=5;
            playeri_j = tile;
          }
          else{
            break;
          }
  
        }
        return [puzzleDataRef,playeri_j];
      }
    public step(puzzleDataRef:number[][],playeri_j:number[],move:number[]): [number[][],number[],string]{
      const tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move);
      const tile =tile_entity[0];
      const entity =tile_entity[1];
      let moveType=''
      if(entity == 0){
        const puzzlePlayer=this.iceLiding(puzzleDataRef,playeri_j,move);
        puzzleDataRef=puzzlePlayer[0];
        playeri_j=puzzlePlayer[1];
        moveType='Move';
        return [puzzleDataRef,playeri_j,moveType];
      }
      else if(entity == 3){
        puzzleDataRef[tile[0]][tile[1]]=0;
        moveType='Enemy';
        return [puzzleDataRef,tile,moveType];
      }
      return [puzzleDataRef,playeri_j,"NotValid"];
    }

      public win(puzzleDataRef:number[][],playeri_j:number[]):boolean{
          const win=SignalType.some((move:keySignal)=>{
            const tile_entity=this.lookAhead(puzzleDataRef,playeri_j,move.move);
            const entity =tile_entity[1];
            if(entity==4){
              return true;
            }
            return false
          });
    
          if(win){
            return true
          }
          return false;
      }

}
