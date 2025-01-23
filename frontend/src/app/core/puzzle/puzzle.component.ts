import { Component,inject } from '@angular/core';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { getDummyResponse } from '../../userSesion/models/puzzle-model';

@Component({
  selector: 'app-puzzle',
  imports: [

  ],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css'
})
export class PuzzleComponent {
  protected apiService= inject(ApiDjangoService);
  protected puzzleData: getDummyResponse={data:[],response:'',code:0};

  async getPuzzleData(){
     await this.apiService.getPuzzles().subscribe((data) => {
      this.puzzleData = JSON.parse(JSON.stringify(data));
      console.log(this.puzzleData.data);
     }); 
  }

  getRow(aux:[]){
    return aux;
  }
}

