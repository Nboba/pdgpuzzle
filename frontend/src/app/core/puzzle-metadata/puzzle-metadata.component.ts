import { AfterContentInit, Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PuzzleLocalService } from '../Services/puzzle-local.service';
import { PuzzleApiService } from '../Services/puzzle-api.service';

@Component({
  selector: 'app-puzzle-metadata',
  imports: [MatExpansionModule],
  templateUrl: './puzzle-metadata.component.html',
  styleUrl: './puzzle-metadata.component.scss'
})
export class PuzzleMetadataComponent implements AfterContentInit {
  public metadata:[number,number]=[0,0];
  public indexP = input.required<number>();

  constructor(private puzzleService:PuzzleLocalService,private puzzleApiService:PuzzleApiService) {
  }

  ngAfterContentInit(): void {
    if(this.puzzleApiService.puzzleResult.length>0){
      this.metadata=this.puzzleApiService.getMetaData(this.indexP());

    }else{
      this.metadata=this.puzzleService.getMetaData(this.indexP());
    }
  }
}
