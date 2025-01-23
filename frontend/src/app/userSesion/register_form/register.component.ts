import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {ApiDjangoService} from '../services/api-django.service';
import { UserRegister} from '../models/puzzle-model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {userRegisterSerializer} from '../serializer/user-serializer';
import { UserSesionService } from '../services/user-sesion.service';

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
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
  });

    async Register(){
            let formValue: UserRegister= userRegisterSerializer(this.registerForm.value);
            this.userData.loginActive=await this.apiService.postRegister(formValue);
        }

    public volver():void{
      this.userData.loginActive=true;
    }

}
