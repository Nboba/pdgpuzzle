import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoPuzzleGameService {
  private _NroMovimientos = signal(0);
  private _NroSoluciones = signal(0);
  private _isGameActive = signal<boolean>(false);
  private _time = signal<number>(0);
  private _moves = signal<number>(0);
  private _interval: ReturnType<typeof setInterval> = setInterval(() => {
    this._time.set(this._time() + 0);
  }, 0);

  // Getters
  get NroMovimientos(): number {
    return this._NroMovimientos();
  }
  set NroMovimientos(value: number) {
    this.NroMovimientos = value;
  }

  get NroSoluciones(): number {
    return this._NroSoluciones();
  }
  
  set NroSoluciones(value: number) {
    this.NroSoluciones = value;
  }

  get isGameActive(): boolean {
    return this._isGameActive();
  }

  set isGameActive(value: boolean) {
    this._isGameActive.set(value);
  }

  get time(): number {
    return this._time();
  }

  set time(value: number) {
    this._time.set(value);
  }
  
  get moves(): number {
    return this._moves();
  }
  set moves(value: number) {
    this._moves.set(value);
  }



  startGame(){
    this.isGameActive=!this.isGameActive;
    if(this._isGameActive()){
      this._interval = setInterval(() => {
        this.time=this.time+1;
      },1000)
    }
    else{
      this.stopTime();
    }
  }
  resetGame(){
    this.moves=0;
    this.time=0;
  }

  stopTime(){
    clearInterval(this._interval);
  }

  addMove(){
    this.moves=this.moves+1;
  }
}
