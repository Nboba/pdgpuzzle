import { Component, 
         inject,
         signal } from '@angular/core';
import {  MatDialogRef,
          MatDialogContent,
          MatDialogTitle, 
          MatDialogModule } from '@angular/material/dialog';
import { PuzzleViewComponent } from '../../puzzle-vista/puzzle-view.component';
import { ResponsePuzzleModel } from '../../Models/request-puzzle-model';
import { MatButtonModule } from '@angular/material/button';
import { puzzleSelected } from '../../Models/interfaces-puzzle';
import { PuzzleLocalService } from '../../Services/puzzle-local.service';
import { PuzzleApiService } from '../../Services/puzzle-api.service';


@Component({
  selector: 'app-modal-puzzle-result',
  imports: [
    PuzzleViewComponent,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './modal-puzzle-result.component.html',
  styleUrl: './modal-puzzle-result.component.scss'
})
export class ModalPuzzleResultComponent {
  readonly dialogRef = inject(MatDialogRef<ModalPuzzleResultComponent>);
  readonly puzzles =signal<ResponsePuzzleModel[]>([]);
  protected checks=signal<puzzleSelected[]>([]);

constructor(private puzzleService:PuzzleLocalService,private puzzleApiService:PuzzleApiService){
  this.puzzles.set(this.puzzleApiService.puzzleResult);
  this.checks.set(this.puzzleApiService.indexPuzzles);
}


  guardarPuzzle(): void {
    this.puzzleService.savedPuzzles=this.puzzleApiService.getSelectedPuzzles();
    this.puzzleApiService.resetResults();
    this.dialogRef.close();
  }

}
