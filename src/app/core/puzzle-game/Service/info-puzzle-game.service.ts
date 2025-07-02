import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { PuzzleDataService } from './puzzle-data.service';

@Injectable({
  providedIn: 'root',
})
export class InfoPuzzleGameService {
  protected readonly puzzleData = inject(PuzzleDataService);
  
  private readonly _NroMovimientos = linkedSignal<number>(() => this.puzzleData.dataPuzzle.NMoves);
  private readonly _NroSoluciones = linkedSignal<number>(() => this.puzzleData.dataPuzzle.NSolutions);
  private readonly _isGameActive = signal<boolean>(false);
  private readonly _time = signal<number>(0);
  private readonly _moves = signal<number>(0);
  private readonly _timeRecord = linkedSignal<number>(computed(() => this.puzzleData.dataPuzzle.PlayerSolution?.SolutionTime??0));
  private readonly _movesRecord = linkedSignal<number>(computed(() => this.puzzleData.dataPuzzle.PlayerSolution?.SolutionNMoves??0));
  private _interval: ReturnType<typeof setInterval> = setInterval(() => {
    this._time.set(this._time() + 0);
  }, 0);

  // Getters
  get NroMovimientos(): number {
    return this._NroMovimientos();
  }
  set NroMovimientos(value: number) {
    this._NroMovimientos.set(value) ;
  }

  get NroSoluciones(): number {
    return this._NroSoluciones();
  }

  set NroSoluciones(value: number) {
    this._NroSoluciones.set(value) ;
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

   get timeRecord():number {
    return this._timeRecord();
  }
   set timeRecord(value:number) {
    this._timeRecord.set(value);
  }

  get movesRecord():number {
    return this._movesRecord();
  }
   set movesRecord(value: number) {
    this._movesRecord.set(value);
  }

  startGame() {
    this.isGameActive = !this.isGameActive;
    if (this.isGameActive) {
      this._interval = setInterval(() => {
        this.time = this.time + 0.01;
      }, 1);
    } else {
      this.stopTime();
    }
  }
  resetGame() {
    this.moves = 0;
    this.time = 0;
  }

  stopTime() {
    clearInterval(this._interval);
  }

  addMove() {
    this.moves = this.moves + 1;
  }

  resetDataInfo(){
    this.moves = 0;
    this.time = 0;
    this.isGameActive=false;
    this.stopTime();
  }


}
