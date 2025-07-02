import { computed, effect, Injectable, signal, linkedSignal } from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import { filterPuzzleOptions } from '../Models/constant-values';
import { IndexFront } from '../Models/interfaces-puzzle';
@Injectable({
  providedIn: 'root',
})
export class PuzzleLocalService {
  private readonly _savedPuzzles: Map<string, ResponsePuzzleModel> = new Map<
    string,
    ResponsePuzzleModel
  >();
  private readonly _filterPuzzleOptions = signal('start');
  private readonly _sortedPuzzles=linkedSignal<IndexFront[]>(computed(
    () => [...this.filterPuzzles(this.FilterPuzzleOptions)]),
  );

  constructor() {
    const filter = localStorage.getItem('filterPuzzleOptions');
    const savePuzzles = localStorage.getItem('puzzlesSelected');
    if (savePuzzles !== null ) {
      const puzzles = JSON.parse(localStorage.getItem('puzzlesSelected') ?? '');
      if(puzzles.length > 0)
      {
        puzzles.forEach((puzzle: ResponsePuzzleModel) => {
          this._savedPuzzles.set(puzzle.id, puzzle);
        });
      }
    }
    if (filter !== null && filter.length > 0) {
      this.FilterPuzzleOptions = filter;
    } else {
      localStorage.setItem('filterPuzzleOptions', filterPuzzleOptions.moves);
      this.FilterPuzzleOptions = filterPuzzleOptions.moves;
    }

    effect(() => {
      this._sortedPuzzles();
    });
  }

  public get savedPuzzles(): Map<string, ResponsePuzzleModel> {
    return this._savedPuzzles;
  }
  public set savedPuzzles(puzzle: ResponsePuzzleModel[]) {
    puzzle.forEach((puzzle: ResponsePuzzleModel) => {
      this._savedPuzzles.set(puzzle.id, puzzle);
    });
    localStorage.setItem('puzzlesSelected', JSON.stringify(Array.from(this.savedPuzzles.values())));
    const filter = localStorage.getItem('filterPuzzleOptions');
    if (filter !== null && filter.length > 0) {
      this._sortedPuzzles.set([...this.filterPuzzles(filter)]);
    }
  }

  public set FilterPuzzleOptions(filter: string) {
    localStorage.setItem('filterPuzzleOptions', filter);
    this._filterPuzzleOptions.update(() => {
      return filter;
    });
  }
  public get FilterPuzzleOptions(): string {
    return this._filterPuzzleOptions();
  }
  public get SortedPuzzles(): IndexFront[] {
    return [...this._sortedPuzzles()];
  }

  public filterPuzzles(filter: string): IndexFront[] {
    const puzzleArray = Array.from(this.savedPuzzles.values());
    switch (filter) {
      case filterPuzzleOptions.solutions: {
        return this.getIndexOfPuzzle(
          puzzleArray.sort(
            (a: ResponsePuzzleModel, b: ResponsePuzzleModel) =>
              b.NSolutions - a.NSolutions,
          ),
        );
      }
      case filterPuzzleOptions.time: {
        return this.getIndexOfPuzzle(
          puzzleArray.sort(
            (a: ResponsePuzzleModel, b: ResponsePuzzleModel) =>
              b.PlayerSolution.SolutionTime - a.PlayerSolution.SolutionTime,
          ),
        );
      }
      case filterPuzzleOptions.haveSolution: {
        return this.getIndexOfPuzzle(
          puzzleArray.filter(
            (a: ResponsePuzzleModel) => a.PlayerSolution.SolutionNMoves > 0,
          ),
        );
      }
      case filterPuzzleOptions.noSolution: {
        return this.getIndexOfPuzzle(
          puzzleArray.filter(
            (a: ResponsePuzzleModel) => a.PlayerSolution.SolutionNMoves == 0,
          ),
        );
      }
      default: {
        return this.getIndexOfPuzzle(
          puzzleArray.sort(
            (a: ResponsePuzzleModel, b: ResponsePuzzleModel) =>
              a.NMoves - b.NMoves,
          ),
        );
      }
    }
  }

  public getIndexOfPuzzle(
    sortedPuzzles: ResponsePuzzleModel[],
  ): IndexFront[] {
    const index: IndexFront[] = [];
    let i = 0;
    sortedPuzzles.forEach((puzzle: ResponsePuzzleModel) => {
      index.push({ index: i, id: puzzle.id });
      i++;
    });
    return index;
  }

  public getPuzzle(id: string): ResponsePuzzleModel {
    const puzzle = this.savedPuzzles.get(id);
    if (puzzle === undefined) {
      return {} as ResponsePuzzleModel;
    }
    return { ...puzzle };
  }

  public getPuzzleIndex(index: number): IndexFront {
    return this.SortedPuzzles.length > index ? this.SortedPuzzles[index] : { index: -1, id: '' };
  }

  public getMetaData(id: string): [number, number] {
    return [this.getPuzzle(id).NMoves, this.getPuzzle(id).NSolutions];
  }

  public deletePuzzle(id: string) {
    this._savedPuzzles.delete(id);
    localStorage.setItem('puzzlesSelected', JSON.stringify(Array.from(this.savedPuzzles.values())));
    const filter = localStorage.getItem('filterPuzzleOptions');
    if (filter !== null && filter.length > 0) {
      this._sortedPuzzles.set([...this.filterPuzzles(filter)]);
    }
  }

  public saveDataGame(index : string, time:number,moves:number){
    const puzzle = this.getPuzzle(index);
    if(puzzle.PlayerSolution.SolutionTime === 0 && puzzle.PlayerSolution.SolutionNMoves === 0){
      puzzle.PlayerSolution.SolutionTime = time;
      puzzle.PlayerSolution.SolutionNMoves = moves ;
    }
    else{
      puzzle.PlayerSolution.SolutionTime = puzzle.PlayerSolution.SolutionTime > time? time : puzzle.PlayerSolution.SolutionTime;
      puzzle.PlayerSolution.SolutionNMoves = puzzle.PlayerSolution.SolutionNMoves > moves? moves : puzzle.PlayerSolution.SolutionNMoves;
    }

    this.savedPuzzles.set(index,puzzle);
    localStorage.setItem('puzzlesSelected', JSON.stringify(Array.from(this.savedPuzzles.values())));
  }
}
