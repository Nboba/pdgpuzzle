import { AfterContentInit, Component, input, output, signal } from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import{cellColors} from '../Models/constant-values';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { PuzzleMetadataComponent } from '../puzzle-metadata/puzzle-metadata.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { puzzleSelected } from '../Models/interfaces-puzzle';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { PuzzleApiService } from '../Services/puzzle-api.service';

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

constructor(private puzzleService:PuzzleLocalService,private puzzleApiService:PuzzleApiService){
}

ngAfterContentInit(): void {
  if(this.puzzleApiService.puzzleResult.length>0){
    this.puzzleData=this.puzzleApiService.puzzleResult[this.index()];

  }else{
    this.puzzleData=this.puzzleService.getPuzzle(this.index());
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
}
