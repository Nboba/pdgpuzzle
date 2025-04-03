import { Injectable, inject } from '@angular/core';
import { SignalType } from '../../../Models/constant-values';
import { MechanicPuzzleService } from './mechanic-puzzle.service';
@Injectable({
  providedIn: 'any',
})
export class PuzzleGameService {
  private readonly gameMechanics = inject(MechanicPuzzleService);

  public resetPuzzle(
    puzzleDataRef: number[][],
    initialPlayeri_j: number[],
    playeri_j: number[],
    enemyPosition: number[][],
  ): number[][] {
    puzzleDataRef[playeri_j[0]][playeri_j[1]] = 0;
    puzzleDataRef[initialPlayeri_j[0]][initialPlayeri_j[1]] = 5;
    enemyPosition.forEach((enemy: number[]) => {
      puzzleDataRef[enemy[0]][enemy[1]] = 3;
    });
    return puzzleDataRef;
  }

  public checkEnemys(
    puzzleDataRef: number[][],
    enemyPosition: number[][],
  ): boolean {
    return enemyPosition.some((enemy: number[]) => {
      if (puzzleDataRef[enemy[0]][enemy[1]] == 3) {
        return true;
      }
      return false;
    });
  }

  public buttonDown(
    event: KeyboardEvent,
    puzzleDataRef: number[][],
    playeri_j: number[],
    enemyPosition: number[][],
  ): [number[], string] {
    const move = SignalType.find((element) => element.key == event.key)?.move;
    let moveType = '';
    if (move) {
      const puzzleStep = this.gameMechanics.step(
        puzzleDataRef,
        playeri_j,
        move,
      );
      puzzleDataRef = puzzleStep[0];
      playeri_j = puzzleStep[1];
      moveType = puzzleStep[2];
      const leftEnemys = this.checkEnemys(puzzleDataRef, enemyPosition);
      if (!leftEnemys) {
        const endGame: boolean = this.gameMechanics.win(
          puzzleDataRef,
          playeri_j,
        );
        if (endGame) {
          return [playeri_j, 'Win'];
        }
      }
    }
    return [playeri_j, moveType];
  }
}
