import { OnInit, Component, inject, OnDestroy, linkedSignal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PuzzleGameService } from './Service/puzzle-game.service';
import { cellColors } from '../..//Models/constant-values';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { InfoPuzzleGameComponent } from './info-puzzle-game/info-puzzle-game.component';
import { InfoPuzzleGameService } from './Service/info-puzzle-game.service';
import { PuzzleDataService } from './Service/puzzle-data.service';

@Component({
  selector: 'app-puzzle-game',
  imports: [MatGridListModule, MatIcon, InfoPuzzleGameComponent],
  templateUrl: './puzzle-game.component.html',
  styleUrl: './puzzle-game.component.scss',
})
export class PuzzleGameComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected Matrix = linkedSignal<number[][]>(() => this.puzzleData.Matrix);
  protected Playeri_j = linkedSignal<number[]>(() => this.puzzleData.Playeri_j);
  protected EnemyPositions = linkedSignal<number[][]>(() => this.puzzleData.EnemyPositions);

  protected readonly informationData = inject(InfoPuzzleGameService);
  protected readonly puzzleData = inject(PuzzleDataService);
  protected readonly gameService = inject(PuzzleGameService);

  ngOnInit(): void {
    this.puzzleData.index = String(this.route.snapshot.paramMap.get('index'));
    this.informationData.isGameActive = false;
    this.informationData.NroMovimientos= this.puzzleData.dataPuzzle.NMoves;
    this.informationData.NroSoluciones= this.puzzleData.dataPuzzle.NSolutions;
  }

  getColorRow(cell: number) {
    return cellColors[cell];
  }

  botonAbajo(event: KeyboardEvent): void {
    const buttonDown = this.gameService.buttonDown(
      event,
      [...this.Matrix()],
      this.Playeri_j(),
      this.EnemyPositions(),
    );
    const move = buttonDown[0];
    const moveType = buttonDown[1];
    if (moveType === 'Win') {
      this.informationData.isGameActive = false;
      this.informationData.stopTime();
    } else if (moveType === 'Move') {
      this.Matrix()[this.Playeri_j()[0]][this.Playeri_j()[1]] = 0;
      this.Matrix()[move[0]][move[1]] = 5;
      this.Playeri_j.set(move);
    } else if (moveType === 'Enemy') {
      this.Matrix()[move[0]][move[1]] = 0;
    }
    this.informationData.addMove();
  }

  ngOnDestroy(): void {
    this.puzzleData.resetData(this.Playeri_j());
  }

  startGame() {
    this.informationData.startGame();
  }

  resetGame() {
    /*     this.Matrix.set(this.gameService.resetPuzzle(this.Matrix(),this.puzzleLocalService.getPuzzle(this.index).PlayerPostions,this.Playeri_j(),this.EnemyPositions()));
    this.Playeri_j.set(this.puzzleLocalService.getPuzzle(this.index).PlayerPostions); */
    this.puzzleData.resetData(this.Playeri_j());
    this.informationData.resetGame();
  }
  back() {
    this.resetGame();
    this.router.navigate(['/Puzzles']);
    this.informationData.isGameActive = false;
  }
}
