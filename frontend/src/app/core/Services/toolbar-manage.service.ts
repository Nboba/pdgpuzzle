import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarManageService {
  private _PuzzleView = signal(true);

  constructor() { }

  public get PuzzleView() {
    return this._PuzzleView();
  }
  public set PuzzleView(value) {
    this._PuzzleView.set(value);
  }

  public changeView() {
    this.PuzzleView=!this.PuzzleView;
  }
}
