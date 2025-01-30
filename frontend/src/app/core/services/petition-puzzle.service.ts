import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import{PetitionPuzzleApi} from '../model/models';
import { ResponsePetition } from '../model/responses';
import { UserSesionService } from '../../userSesion/services/user-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PetitionPuzzleService {
  private apiUrl='http://localhost:8000/';
  constructor(private http: HttpClient,private userSesion:UserSesionService) { }
  postPetition(petition:PetitionPuzzleApi): Observable<ResponsePetition>{
    return this.http.post<ResponsePetition>(this.apiUrl + 'Puzzle/petition/'+this.userSesion.userName+'/', { petition });
  }

  getPuzzlesPlayer(amount:number,page:number): Observable<unknown>{
    return this.http.get<unknown>(this.apiUrl + 'Puzzle/'+this.userSesion.userName+'/cant'+amount+'/pages'+(page-1)+'/');
  }
}
