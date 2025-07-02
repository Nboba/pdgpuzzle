import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';

import { PuzzleLocalService } from '../../../Services/puzzle-local.service';
import { ResponsePuzzleModel } from '../../../Models/request-puzzle-model';

@Injectable({
  providedIn: 'root',
})
export class PuzzleDataService {
  private readonly puzzleLocalService = inject(PuzzleLocalService);

  private readonly _index = signal<string>('');
  private readonly _dataPuzzle = linkedSignal<ResponsePuzzleModel>(computed(()=> this.puzzleLocalService.getPuzzle(this._index())));
  private readonly _Matrix = linkedSignal<number[][]>(computed(() => {
    return this.dataPuzzle.Matrix;
  }));
  private readonly _Playeri_j = linkedSignal<number[]>(computed(() => {
    return this.dataPuzzle.PlayerPostions;
  }));
  private readonly _initialPlayeri_j = linkedSignal<number[]>(computed(() => {
    return this.dataPuzzle.PlayerPostions;
  }));
  private readonly _EnemyPositions = linkedSignal<number[][]>(computed(() => {
    return this.dataPuzzle.EnemyPositions;
  }));

  private readonly _time = linkedSignal<number>(computed(() => {
    return this.dataPuzzle.PlayerSolution.SolutionTime;
  }));

  private readonly _moves = linkedSignal<number>(computed(() => {
    return this.dataPuzzle.PlayerSolution.SolutionNMoves;
  }));

  public get time(): number {
    return this._time();
  }
  public set time(value: number) {
    this._time.set(value);
  }

  public get moves(): number {
    return this._moves();
  }
  public set moves(value: number) {
    this._moves.set(value);
  }

  public get index(): string {
    return this._index();
  }
  public set index(value: string) {
    this._index.set(value);
  }
  public get Matrix(): number[][] {
    return [...this._Matrix()];
  }
  public set Matrix(value: number[][]) {
    this._Matrix.set(value);
  }
  public get Playeri_j(): number[] {
    return [...this._Playeri_j()];
  }
  public set Playeri_j(value: number[]) {
    this._Playeri_j.set(value);
  }
  public get EnemyPositions(): number[][] {
    return [...this._EnemyPositions()];
  }
  public set EnemyPositions(value: number[][]) {
    this._EnemyPositions.set(value);
  }
  public get dataPuzzle(): ResponsePuzzleModel {
    return { ...this._dataPuzzle() };
  }

  public set dataPuzzle(value: ResponsePuzzleModel) {
    this._dataPuzzle.set(value);
  }

  public get initialPlayeri_j(): number[] {
    return [...this._initialPlayeri_j()];
  }
  public set initialPlayeri_j(value: number[]) {
    this._initialPlayeri_j.set(value);
  }

  resetData(playerpos:number[]) {
    this.Matrix[playerpos[0]][playerpos[1]] = 0;
    this.Matrix[this.initialPlayeri_j[0]][this.initialPlayeri_j[1]] = 5;
    this.EnemyPositions.forEach((enemy: number[]) => {
      this.Matrix[enemy[0]][enemy[1]] = 3;
    });
    this.Playeri_j = [...this.initialPlayeri_j];
  }


  wingame(time:number, moves:number,Playeri_j:number[]):void {
    this.resetData(Playeri_j);
    if(time===0 && moves!==0){
      return;
    }
   if((this.time === 0 && this.moves === 0) || (this.time > 0 || this.moves > 0)) { 
      this.puzzleLocalService.saveDataGame(this.index, time, moves); 
    }
  }
}
