import { Component,   inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ApiDjangoService } from '../../userSesion/services/api-django.service';
import { UserSesionService } from '../../userSesion/services/user-sesion.service';

@Component({
  selector: 'nav-bar',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    RouterLink,
    CdkMenu, 
    CdkMenuItem, 
    CdkMenuTrigger,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    protected apiService= inject(ApiDjangoService);
    protected dataUser=inject(UserSesionService);
    
     
  async logOut(){
    await this.apiService.logOut();
  }

}

