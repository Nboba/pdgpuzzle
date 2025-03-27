import { Component, computed, signal } from '@angular/core';
import { PuzzleViewComponent } from '../puzzle-vista/puzzle-view.component';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filterPuzzleOptionsArray } from '../Models/constant-values';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-puzzle-container',
  imports: [
    PuzzleViewComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  templateUrl: './puzzle-container.component.html',
  styleUrl: './puzzle-container.component.scss',
})
export class PuzzleContainerComponent {
  protected savePuzzles = computed(() => this.puzzleService.SortedPuzzles);
  protected filter = signal<string>('');
  protected filterOptions = filterPuzzleOptionsArray;

  constructor(private puzzleService: PuzzleLocalService) {
    this.filter.set(this.puzzleService.FilterPuzzleOptions);
  }

  filterPuzzles() {
    this.puzzleService.FilterPuzzleOptions = this.filter();
  }

  selected(filter: string) {
    if (this.filter() === filter) {
      this.savePuzzles().reverse();
    }
  }
}
