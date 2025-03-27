import {
  AfterContentInit,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import { cellColors } from '../Models/constant-values';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { PuzzleMetadataComponent } from '../puzzle-metadata/puzzle-metadata.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { PuzzleApiService } from '../Services/puzzle-api.service';
import { MatDialog } from '@angular/material/dialog';
import { PuzzleGameComponent } from '../puzzle-game/puzzle-game.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PuzzleDataService } from '../puzzle-game/Service/puzzle-data.service';

@Component({
  selector: 'app-puzzle-view',
  imports: [
    MatGridListModule,
    MatExpansionModule,
    PuzzleMetadataComponent,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './puzzle-view..component.html',
  styleUrl: './puzzle-view..component.scss',
})
export class PuzzleViewComponent implements AfterContentInit {
  public puzzleData: ResponsePuzzleModel = {} as ResponsePuzzleModel;
  public index = input.required<{ in: number; id: string }>();
  protected checks = signal<boolean>(false);
  protected backgroundColors = '';
  protected readonly dialog = inject(MatDialog);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected puzzleDataGame = inject(PuzzleDataService);

  constructor(
    private puzzleLocalService: PuzzleLocalService,
    private puzzleApiService: PuzzleApiService,
  ) {}

  ngAfterContentInit(): void {
    console.log(this.index());
    if (this.puzzleApiService.puzzleResult.length > 0) {
      this.puzzleData = this.puzzleApiService.puzzleResult[this.index().in];
    } else {
      this.puzzleData = this.puzzleLocalService.getPuzzle(this.index().id);
    }
  }

  getColorRow(cell: number) {
    return cellColors[cell];
  }
  updateCheck() {
    this.checks.set(!this.checks());
    this.backgroundColors = this.checks() ? 'border: 13px #ECFF4A solid;' : '';
    this.puzzleApiService.updateCheck(this.index().in);
  }

  openDialog(): void {
    this.dialog.open(PuzzleGameComponent, {
      width: '80vw',
      maxWidth: '32vw',
      data: { index: this.index() },
    });
    this.dialog.afterAllClosed.subscribe();
  }

  clickManager() {
    this.activatedRoute.url.subscribe((url) => {
      if (url.toString() === 'Puzzles') {
        this.puzzleDataGame.index = this.index().id;
        this.router.navigate(['Puzzles', this.index().in]);
      } else if (this.puzzleApiService.puzzleResult.length > 0) {
        this.updateCheck();
      }
    });
  }
}
