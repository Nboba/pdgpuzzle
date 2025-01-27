import { Component } from '@angular/core';
import{ Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

import { UserSesionService } from '../services/user-sesion.service';
import {ApiDjangoService} from '../services/api-django.service';

import { UserRegister} from '../models/puzzle-model';

import {userRegisterSerializer} from '../serializer/user-serializer';
import { noSpecialCharacters,noOnlyNumbers } from '../validators/validators-forms';

@Component({
  selector: 'register-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private apiService: ApiDjangoService,private userData:UserSesionService) { }


    protected registerForm=new FormGroup({
      username: new FormControl(null,[Validators.required,noSpecialCharacters,noOnlyNumbers]),
      password: new FormControl(null,[Validators.required,noOnlyNumbers]),
      email: new FormControl(null,[Validators.required,Validators.email])
  });

    async Register(){
        if(this.registerForm.valid){
          let formValue: UserRegister= userRegisterSerializer(this.registerForm.value);
          this.userData.loginActive=await this.apiService.postRegister(formValue);
      }
      else{
        alert("Error en los datos ingresados");
      }
    }

    public volver():void{
      this.userData.loginActive=true;
    }

}
