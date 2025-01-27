import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {ApiDjangoService} from '../services/api-django.service';
import {UserLogin,} from '../models/puzzle-model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {userSerializer} from '../serializer/user-serializer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserSesionService } from '../services/user-sesion.service';
import{Validators} from '@angular/forms';


@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private apiService: ApiDjangoService,private userData:UserSesionService) { }
    protected loginForm=new FormGroup({
        username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required),
    });

   async Login(){
    if(this.loginForm.valid){
      let formValue: UserLogin= userSerializer(this.loginForm.value);
      this.userData.sesionActive=await this.apiService.postLogin(formValue);
    }
    else{
      alert("Error en los datos ingresados");
    };


      };
      
    public setActiveRegisterForm():void{
      this.userData.loginActive=false;
    }
}
