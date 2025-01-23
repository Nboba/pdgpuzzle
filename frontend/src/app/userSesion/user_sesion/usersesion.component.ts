import { Component ,computed,inject,signal} from '@angular/core';
import {LoginComponent} from '../login_form/login.component';
import {RegisterComponent} from '../register_form/register.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ApiDjangoService} from '../services/api-django.service';
import { UserSesionService } from '../services/user-sesion.service';

@Component({
  selector: 'user-sesion',
  imports: [
    LoginComponent
    ,RegisterComponent,    
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './usersesion.component.html',
  styleUrl: './usersesion.component.css'
})
export class UserSesionComponent {
  protected userInfo= inject(UserSesionService);

}
