import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import { filterPuzzleOptions } from '../Models/constant-values';
@Injectable({
  providedIn: 'root',
})
export class PuzzleLocalService {
  private _savedPuzzles: Map<string, ResponsePuzzleModel> = new Map<
    string,
    ResponsePuzzleModel
  >();
  private _filterPuzzleOptions = signal('start');
  private _sortedPuzzles: Signal<{ in: number; id: string }[]> = computed(
    () => [...this.filterPuzzles(this.FilterPuzzleOptions)],
  );

  constructor() {
    const filter = localStorage.getItem('filterPuzzleOptions');
    const savePuzzles = localStorage.getItem('puzzlesSelected');
    if (savePuzzles !== null) {
      const puzzles = JSON.parse(localStorage.getItem('puzzlesSelected') ?? '');
      puzzles.forEach((puzzle: ResponsePuzzleModel) => {
        this._savedPuzzles.set(puzzle.id, puzzle);
      });
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
    localStorage.setItem('puzzlesSelected', JSON.stringify(this._savedPuzzles));
    const filter = localStorage.getItem('filterPuzzleOptions');
    if (filter !== null && filter.length > 0) {
      this.FilterPuzzleOptions = filter;
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
  public get SortedPuzzles(): { in: number; id: string }[] {
    return [...this._sortedPuzzles()];
  }

  public filterPuzzles(filter: string): { in: number; id: string }[] {
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
              b.PlayerSolution.solutionTime - a.PlayerSolution.solutionTime,
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
  ): { in: number; id: string }[] {
    const index: { in: number; id: string }[] = [];
    let i = 0;
    sortedPuzzles.forEach((puzzle: ResponsePuzzleModel) => {
      index.push({ in: i, id: puzzle.id });
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
  public getMetaData(id: string): [number, number] {
    return [this.getPuzzle(id).NMoves, this.getPuzzle(id).NSolutions];
  }

  public deletePuzzle(id: string) {
    this._savedPuzzles.delete(id);
    localStorage.setItem('puzzlesSelected', JSON.stringify(this._savedPuzzles));
    const filter = localStorage.getItem('filterPuzzleOptions');
    if (filter !== null && filter.length > 0) {
      this.FilterPuzzleOptions = filter;
    }
  }
}
