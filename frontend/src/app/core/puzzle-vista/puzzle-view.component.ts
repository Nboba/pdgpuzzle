import { AfterContentInit, Component, inject, input, signal } from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import{cellColors} from '../Models/constant-values';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { PuzzleMetadataComponent } from '../puzzle-metadata/puzzle-metadata.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { PuzzleApiService } from '../Services/puzzle-api.service';
import { MatDialog } from '@angular/material/dialog';
import { PuzzleGameComponent } from '../puzzle-game/puzzle-game.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';




@Component({
  selector: 'app-puzzle-view',
  imports: [
    MatGridListModule,
    MatExpansionModule,
    PuzzleMetadataComponent,
    MatCheckboxModule,
    MatTooltipModule
  ],
  templateUrl: './puzzle-view..component.html',
  styleUrl: './puzzle-view..component.scss'
})
export class PuzzleViewComponent implements AfterContentInit {
  public puzzleData:ResponsePuzzleModel={} as ResponsePuzzleModel;
  public index= input.required<number>();
  protected checks=signal<boolean>(false);
  protected backgroundColors:string='';
  protected readonly dialog = inject(MatDialog);



constructor(private puzzleLocalService:PuzzleLocalService,private puzzleApiService:PuzzleApiService,private activatedRoute: ActivatedRoute,private router: Router) {
}

ngAfterContentInit(): void {
  if(this.puzzleApiService.puzzleResult.length>0){
    this.puzzleData=this.puzzleApiService.puzzleResult[this.index()];

  }else{
    this.puzzleData=this.puzzleLocalService.getPuzzle(this.index());
  }
}

  getColorRow(cell:number){
    return cellColors[cell];
  }
  updateCheck(){
    this.checks.set(!this.checks());
    this.backgroundColors=this.checks()?'border: 13px #ECFF4A solid;':'';
    this.puzzleApiService.updateCheck(this.index());
  }

  openDialog(): void {
    this.dialog.open(PuzzleGameComponent,
      {
        width: '80vw',
        maxWidth: '32vw',
        data: {index:this.index()}
    });
    this.dialog.afterAllClosed.subscribe(result => {
    });
  }

  clickManager(){
    this.activatedRoute.url.subscribe( (url)=>{
      if(url.toString()==='Puzzles'){
        this.router.navigate(['/index', { index : this.index() }]);
      }
      else if(this.puzzleApiService.puzzleResult.length>0){
      this.updateCheck()
      }
    });
  }

}
