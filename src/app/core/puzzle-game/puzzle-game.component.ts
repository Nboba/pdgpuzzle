import { OnInit, Component, inject, OnDestroy, linkedSignal, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PuzzleGameService } from './Service/puzzle-game.service';
import { cellColors } from '../..//Models/constant-values';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { InfoPuzzleGameComponent } from './info-puzzle-game/info-puzzle-game.component';
import { InfoPuzzleGameService } from './Service/info-puzzle-game.service';
import { PuzzleDataService } from './Service/puzzle-data.service';
import { PuzzleLocalService } from '../../Services/puzzle-local.service';

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
  protected readonly puzzleLocal = inject(PuzzleLocalService);
  ngOnInit(): void {
    const index= Number(this.route.snapshot.paramMap.get('index'));
    const id = this.puzzleLocal.getPuzzleIndex(index);
    this.puzzleData.index = id.id;
    this.informationData.isGameActive = false;
  }

  getColorRow(cell: number) {
    return cellColors[cell];
  }

  @HostListener('window:keydown', ['$event'])
  botonAbajo(event: KeyboardEvent): void {
    if (!this.informationData.isGameActive) {
      return;
    }
    const buttonDown = this.gameService.buttonDown(
      event,
      [...this.Matrix()],
      this.Playeri_j(),
      this.EnemyPositions(),
    );
    const move = buttonDown[0];
    const moveType = buttonDown[1];
    if (moveType === 'Win') {
      this.informationData.addMove();
      this.puzzleData.wingame(
        this.informationData.time,
         this.informationData.moves,
         move);
      this.informationData.resetDataInfo();
      return;
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
    this.puzzleData.resetData(this.Playeri_j());
    this.informationData.resetDataInfo();
  }
  back() {
    this.resetGame();
    this.router.navigate(['/Puzzles']);
    this.informationData.isGameActive = false;
  }


}
