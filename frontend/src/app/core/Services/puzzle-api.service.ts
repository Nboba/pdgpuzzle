import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {
  RequestPuzzleModel,
  RequestPetitionPuzzleModel,
  ResponsePuzzleModel,
} from '../Models/request-puzzle-model';
import { puzzleSelected } from '../Models/interfaces-puzzle';

@Injectable({
  providedIn: 'root',
})
export class PuzzleApiService {
  private readonly API_URL: string = 'https://localhost:7146';
  private _puzzleResult = signal<ResponsePuzzleModel[]>([]);
  private _indexPuzzles = signal<puzzleSelected[]>([]);

  constructor(private readonly http: HttpClient) {
    for (let i = 0; i < 10; i++) {
      this._indexPuzzles().push({ index: i, selected: false });
    }
  }

  public get indexPuzzles(): puzzleSelected[] {
    return this._indexPuzzles();
  }

  public get puzzleResult(): ResponsePuzzleModel[] {
    return this._puzzleResult();
  }
  public set puzzleResult(value: ResponsePuzzleModel[]) {
    this._puzzleResult.set(value);
  }
  public updateCheck(checkPuzzle: number): void {
    this._indexPuzzles()[checkPuzzle].selected =
      !this._indexPuzzles()[checkPuzzle].selected;
  }

  public resetResults(): void {
    this._indexPuzzles().forEach((check) => (check.selected = false));
    this._puzzleResult.set([]);
  }
  public getSelectedPuzzles(): ResponsePuzzleModel[] {
    return this._indexPuzzles()
      .filter((check) => check.selected === true)
      .map((checks) => this._puzzleResult()[checks.index]);
  }

  public getMetaData(index: number): [number, number] {
    return [
      this._puzzleResult()[index].NMoves,
      this._puzzleResult()[index].NSolutions,
    ];
  }

  getPuzzle(): Observable<RequestPuzzleModel> {
    return this.http.get<RequestPuzzleModel>(`${this.API_URL}/PuzzleApi`);
  }

  getNPuzzle(
    request: RequestPetitionPuzzleModel,
  ): Observable<RequestPuzzleModel> {
    console.log(`${this.API_URL}/GetNPuzzles`);
    return this.http.post<RequestPuzzleModel>(
      `${this.API_URL}/PuzzleApi/GetNPuzzles`,
      request,
    );
  }
}
