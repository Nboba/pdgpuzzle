import { Component,inject } from '@angular/core';
import{UserSesionService} from '../../userSesion/services/user-sesion.service';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { PuzzlePublicComponent } from './puzzle-public/puzzle-public.component';
import { PuzzlePlayerComponent } from './puzzle-player/puzzle-player.component';
import { PetitionsPlayerComponent } from './petitions-player/petitions-player.component';
@Component({
  selector: 'body-content',
  imports: [
    PuzzlePublicComponent,
    PuzzlePlayerComponent,
    PetitionsPlayerComponent
  ],
  templateUrl: './body-content.component.html',
  styleUrl: './body-content.component.css'
})
export class BodyContentComponent {
  protected userInfo= inject(UserSesionService);
  constructor(private  apiUser:ApiDjangoService){

  }
  
}
