import { AfterContentInit, Component, input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PuzzleLocalService } from '../../Services/puzzle-local.service';
import { PuzzleApiService } from '../../Services/puzzle-api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-puzzle-metadata',
  imports: [MatExpansionModule, MatIcon],
  templateUrl: './puzzle-metadata.component.html',
  styleUrl: './puzzle-metadata.component.scss',
})
export class PuzzleMetadataComponent implements AfterContentInit {
  public metadata: [number, number] = [0, 0];
  public indexP = input.required<{ in: number; id: string }>();
  protected deleteActive = signal<boolean>(false);
  protected isPetitionActive = signal<boolean>(false);

  constructor(
    private puzzleLocalService: PuzzleLocalService,
    private puzzleApiService: PuzzleApiService,
  ) {}

  ngAfterContentInit(): void {
    if (this.puzzleApiService.puzzleResult.length > 0) {
      this.metadata = this.puzzleApiService.getMetaData(this.indexP().in);
      this.isPetitionActive.set(true);
    } else {
      this.metadata = this.puzzleLocalService.getMetaData(this.indexP().id);
    }
  }
  deletePuzzle() {
    this.puzzleLocalService.deletePuzzle(this.indexP().id);
    this.deleteActive.set(!this.deleteActive());
  }
}
