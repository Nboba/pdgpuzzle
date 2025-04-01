import { Component, inject, linkedSignal, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { InfoPuzzleGameService } from '../../Service/info-puzzle-game.service';

@Component({
  selector: 'app-botones-start-stop-reset',
  imports: [
    MatIcon,
  ],
  templateUrl: './botones-start-stop-reset.component.html',
  styleUrl: './botones-start-stop-reset.component.scss'
})
export class BotonesStartStopResetComponent {
  private readonly informationData = inject(InfoPuzzleGameService);

  protected isGameActive = linkedSignal<boolean>(()=>  this.informationData.isGameActive);
  
  protected resetSignalBotones = output<void>();
  startGame() {
    this.informationData.startGame();
  }
  resetGame() {
    this.resetSignalBotones.emit();
  }
}
