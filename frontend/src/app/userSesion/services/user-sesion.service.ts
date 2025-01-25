import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSesionService {
  private _loginActive = signal(true);
  private _sesionActive = signal(false);
  private _sesionToken=signal('');
  private _userName = signal('');
  private _email=signal('');
  private _userId=signal(-1);

  constructor() { }

  public get loginActive():boolean {
    return this._loginActive();
  }
  public set loginActive(value:boolean) {
    this._loginActive.update(()=>value)  ;
  }

  public get userName() {
    return this._userName();
  }
  public set userName(value:string) {
      this._userName.update(()=>value)  
  }

  public get email() {
    return this._email();
  }
  public set email(value:any) {
    this._email.update(()=>value)  
  }
  public get userId():number {
    return this._userId();
  }
  public set userId(value:number) {
    this._userId.update(()=>value)  
  }

  public set sesionToken(sesionToken: string){
    this._sesionToken.update(()=>sesionToken);
    sessionStorage.setItem('sesionToken',this._sesionToken());
  }
  public get sesionToken(): string{
    return this._sesionToken();
  }
  public set sesionActive(sesionActive: boolean){
    this._sesionActive.update(()=>sesionActive);
  }
  public get sesionActive(): boolean{
    return this._sesionActive();
  }

  public logOut(){
    this.sesionActive=false;
    this.sesionToken='';
    this.userName='';
    this.userId=-1;
    sessionStorage.removeItem('sesionToken');
  }
  public login(response:any){
    this.sesionToken=response.data.session_key;
    this.userName=response.data.username;
    this.userId=response.data.user_id;
    this.loginActive=true;
    sessionStorage.setItem('sesionToken',this.sesionToken);
  } 
}

