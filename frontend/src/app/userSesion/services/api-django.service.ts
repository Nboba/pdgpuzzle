import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { UserLogin,UserRegister} from '../models/puzzle-model';
import { Observable } from 'rxjs';
import { UserSesionService } from './user-sesion.service';
import { rxResource } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ApiDjangoService {
  private apiUrl='http://localhost:8000/';

    constructor(private http: HttpClient ,private userData:UserSesionService) {
    }

   getPuzzles():Observable<any>{
     console.log(this.apiUrl+'Puzzle/Solution/')
      return this.http.get<any>(this.apiUrl+'Puzzle/');
  }
  getPuzzlesres():Observable<any>{
    console.log(this.apiUrl+'Puzzle/Solution/')
     return this.http.get<any>(this.apiUrl+'Puzzle/');
 }

  postRegister(userRegister:UserRegister): Promise<any> {
     return this.http.post(this.apiUrl + 'userApiregister/',{userRegister}).toPromise().
     then(() => {
       return true;
     }).catch((error) => {
       console.log('❌ Error:', error)
       return false;});;
    }

    postLogin(userLogin:UserLogin): Promise<boolean> {
      return this.http.post(this.apiUrl + 'userApilogin/',{userLogin}).toPromise().
      then((response:any) => {
        this.userData.login(response)
        console.log('✅ Éxito:',response.status);
        return true;
      }).catch((error) => {
        console.log('❌ Error:', error)
        return false;});
      }

    logOut():Promise<boolean>{
      return this.http.post(this.apiUrl + 'userApilogOut/',{'token':this.userData.sesionToken,
        'userId':this.userData.userId}).toPromise().
        then((response:any) => {
          this.userData.logOut();
          console.log('✅ Éxito:',response.status);
          return false;
        }).catch((error) => {
          console.log('❌ Error:', error)
          return true;});
        
    }


  }

