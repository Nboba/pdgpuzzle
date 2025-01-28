import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import{PetitionPuzzleApi} from '../model/models';
import { UserSesionService } from '../../userSesion/services/user-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PetitionPuzzleService {
  private apiUrl='http://localhost:8000/';
  constructor(private http: HttpClient,private userSesion:UserSesionService) { }
  postPetition(petition:PetitionPuzzleApi): Observable<unknown>{
    return this.http.post(this.apiUrl + 'Puzzle/petition/'+this.userSesion.userName+'/', { petition });
  }
}
