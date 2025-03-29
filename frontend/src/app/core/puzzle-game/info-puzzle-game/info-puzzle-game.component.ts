import { Component, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { InfoPuzzleGameService } from '../Service/info-puzzle-game.service';
import { PuzzleLocalService } from '../../../Services/puzzle-local.service';
@Component({
  selector: 'app-info-puzzle-game',
  imports: [MatIcon],
  templateUrl: './info-puzzle-game.component.html',
  styleUrl: './info-puzzle-game.component.scss',
})
export class InfoPuzzleGameComponent {
  public NroMovimientos = input.required<number>();
  public NroSoluciones = input.required<number>();
  protected isGameActive = signal<boolean>(false);
  protected time = signal<number>(0);
  protected moves = signal<number>(0);
  protected informationData = inject(InfoPuzzleGameService);
  protected interval: ReturnType<typeof setInterval> = setInterval(() => {
    this.time.set(this.time() + 0);
  }, 0);

  constructor(private puzzleLocalService: PuzzleLocalService) {}
  startGame() {
    this.informationData.startGame();
  }
  resetGame() {
    console.log();
  }
}
