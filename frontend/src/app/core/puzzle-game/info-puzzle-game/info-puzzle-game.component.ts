import { Component, inject, linkedSignal, OnDestroy, output} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { InfoPuzzleGameService } from '../Service/info-puzzle-game.service';
import {PuzzleDataService} from '../Service/puzzle-data.service';
@Component({
  selector: 'app-info-puzzle-game',
  imports: [
    MatIcon,
    CdkDrag,
    MatExpansionModule,
    
  ],
  templateUrl: './info-puzzle-game.component.html',
  styleUrl: './info-puzzle-game.component.scss',
})
export class InfoPuzzleGameComponent implements OnDestroy {
  public NroMovimientos = linkedSignal<number>(()=>  this.informationData.NroMovimientos);
  public NroSoluciones = linkedSignal<number>(()=>  this.informationData.NroSoluciones);
  protected isGameActive = linkedSignal<boolean>(()=>  this.informationData.isGameActive);
  protected time = linkedSignal<number>(()=>  this.informationData.time);
  protected moves = linkedSignal<number>(()=>  this.informationData.moves);
  private readonly informationData = inject(InfoPuzzleGameService);
  private readonly dataPuzzle = inject(PuzzleDataService);
  protected resetSignal = output<void>();
  protected interval: ReturnType<typeof setInterval> = setInterval(() => {
    this.time.set(this.time() + 0);
  }, 0);


  ngOnDestroy(): void {
    this.informationData.resetDataInfo();
  }

  startGame() {
    this.informationData.startGame();
  }
  resetGame() {
    this.resetSignal.emit();
  }
}
