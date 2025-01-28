import { Injectable,signal } from '@angular/core';
import { SignalType,keySignal } from '../model/models';
@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private _puzzleDataRef =signal<number[]>([]);
  private _playeri_j =signal<number[]>([]);
  private _initialPlayeri_j =signal<number[]>([]);
  private _doorpoosition =signal<number[]>([]);
  private _enemyPosition =signal<number[]>([]);
  private _puzzleId =signal<number>(-1);
    constructor() {}
    
    public get puzzleDataRef(): any {
      return this._puzzleDataRef();
    }
    public set puzzleDataRef(value: any) {
      this._puzzleDataRef.update(()=>[...value]);
    }
    public get playeri_j(): any {
      return this._playeri_j();
    }
    public set playeri_j(value: any) {
      this._playeri_j.update(()=>[value[0],value[1]]);
    }
    public get initialPlayeri_j(): any {
      return this._initialPlayeri_j();
    }
    public set initialPlayeri_j(value: any) {
      this._initialPlayeri_j.update(()=>[value[0],value[1]]);
    }
    public get doorpoosition(): any {
      return this._doorpoosition();
    }
    public set doorpoosition(value: any) {
      this._doorpoosition.update(()=>value);
    }
    public get enemyPosition(): any {
      return this._enemyPosition();
    }
    public set enemyPosition(value: any) {
      this._enemyPosition.update(()=>value);
    }
    public get puzzleId(): number {
      return this._puzzleId();
    }
    public set puzzleId(value: number) {
      this._puzzleId.update(()=>value)
    }
  

  public resetPuzzle(){
    let puzzle= [...this.puzzleDataRef];
    puzzle[this.playeri_j[0]][this.playeri_j[1]]=0;
    this._puzzleDataRef.set([...puzzle]);
    puzzle[this.initialPlayeri_j[0]][this.initialPlayeri_j[1]]=5;
    this._puzzleDataRef.set([...puzzle]);
    this.enemyPosition.map((enemy:number[])=>{puzzle[enemy[0]][enemy[1]]=3});
    this._puzzleDataRef.set([...puzzle]);
    this.playeri_j=this.initialPlayeri_j;
    console.log('reset',this.puzzleDataRef);
  }

  public lookAhead(move:number[]):[number[],number]{
      let tile= [Number(this.playeri_j[0]) + move[0],Number(this.playeri_j[1]) + move[1]];
      let entity = Number(this.puzzleDataRef[tile[0]][tile[1]]);
      return [tile,entity];
  }
  public iceLiding(move:number[]){
      while(true){
        let tile_entity=this.lookAhead(move);
        let tile =tile_entity[0];
        let entity =tile_entity[1];
        if(entity===0 ){
          this.puzzleDataRef[this.playeri_j[0]][this.playeri_j[1]]=0;
          this.puzzleDataRef[tile[0]][tile[1]]=5;
          this.playeri_j = tile;
          this.puzzleDataRef=this.puzzleDataRef;
        }
        else{
          break;
        }
      
      }
    }
  public step(move:number[]){
    let tile_entity=this.lookAhead(move);
    let tile =tile_entity[0];
    let entity =tile_entity[1];
    if(entity == 0){
      this.iceLiding(move);
    }
    else if(entity == 3){
      this.puzzleDataRef[tile[0]][tile[1]]=0;
    }
    this.puzzleDataRef=this.puzzleDataRef;
  }
  public win(){
    let leftEnemys=this.enemyPosition.some((enemy:number[])=>{
      if(this.puzzleDataRef[enemy[0]][enemy[1]]==3){
        return true;
      }
      return false;
    });
    if(!leftEnemys){
      let win=SignalType.some((move:keySignal)=>{
        let tile_entity=this.lookAhead(move.move);
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
  }

  public buttonDown(event: KeyboardEvent){
    let move =SignalType.find((element)=>element.key==event.key)?.move;
    if(move){
      this.step(move)
      this. win();
    }
  }
}
