import { Component, effect, inject, linkedSignal, OnDestroy, output} from '@angular/core';
import{DecimalPipe} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { InfoPuzzleGameService } from '../Service/info-puzzle-game.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BotonesStartStopResetComponent } from './botones-start-stop-reset/botones-start-stop-reset.component';
@Component({
  selector: 'app-info-puzzle-game',
  imports: [
    MatIcon,
    CdkDrag,
    MatExpansionModule,
    MatTooltipModule,
    BotonesStartStopResetComponent,
    DecimalPipe,
    
  ],
  templateUrl: './info-puzzle-game.component.html',
  styleUrl: './info-puzzle-game.component.scss',
})
export class InfoPuzzleGameComponent implements OnDestroy {
  public initialPositionReset = {x: 400, y: -100};
  public NroMovimientos = linkedSignal<number>(()=>  this.informationData.NroMovimientos);
  public NroSoluciones = linkedSignal<number>(()=>  this.informationData.NroSoluciones);
  protected time = linkedSignal<number>(()=>  this.informationData.time);
  protected moves = linkedSignal<number>(()=>  this.informationData.moves);
  protected recordTime = linkedSignal<number>(()=>  this.informationData.timeRecord);
  protected recordMoves = linkedSignal<number>(()=>  this.informationData.movesRecord);
  private readonly informationData = inject(InfoPuzzleGameService);
 
  protected resetSignal = output<void>();

  constructor(){
    effect(()=>{
      this.recordTime();
      this.recordMoves();
    })
  }
  protected interval: ReturnType<typeof setInterval> = setInterval(() => {
    this.time.set(this.time() + 0);
  }, 0);


  ngOnDestroy(): void {
    this.informationData.resetDataInfo();
  }

  resetGame() {
    this.resetSignal.emit();
  }

  resetPosition(){
    this.initialPositionReset = {x: 0, y: 0};
  }
}
