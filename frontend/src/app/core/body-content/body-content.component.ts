import { Component,inject } from '@angular/core';
import{UserSesionService} from '../../userSesion/services/user-sesion.service';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';

@Component({
  selector: 'body-content',
  imports: [

  ],
  templateUrl: './body-content.component.html',
  styleUrl: './body-content.component.css'
})
export class BodyContentComponent {
  protected userInfo= inject(UserSesionService);
  constructor(private  apiUser:ApiDjangoService){

  }
  
}
