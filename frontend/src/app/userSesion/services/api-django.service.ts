import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { GetResponse ,UserLogin,UserRegister,PostResponse, Puzzle} from '../models/puzzle-model';
import { Observable } from 'rxjs';
import { UserSesionService } from './user-sesion.service';


@Injectable({
  providedIn: 'root'
})
export class ApiDjangoService {
  private apiUrl='http://localhost:8000/';

    constructor(private http: HttpClient ,private userData:UserSesionService) {
    }

   getPuzzles():Observable<Puzzle>{
     console.log(this.apiUrl+'Puzzle/Solution/')
      return this.http.get<Puzzle>(this.apiUrl+'Puzzle/');
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
        this.userData.sesionToken=response.data.session_key;
        this.userData.userName=response.data.username;
        this.userData.userId=response.data.user_id;
        this.userData.loginActive=true;
        sessionStorage.setItem('sesionToken',this.userData.sesionToken);
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
          this.userData.sesionActive=false;
          this.userData.sesionToken='';
          this.userData.userName='';
          this.userData.userId=-1;
          sessionStorage.removeItem('sesionToken');
          console.log('✅ Éxito:',response.status);
          return false;
        }).catch((error) => {
          console.log('❌ Error:', error)
          return true;});
        
    }


  }

