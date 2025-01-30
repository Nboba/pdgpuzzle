import { Component, inject } from '@angular/core';
import { ApiDjangoService } from './userSesion/services/api-django.service';
import { MenuComponent } from './navBar/menu/menu.component';
import {  RouterOutlet , RouterLink, RouterLinkActive} from '@angular/router';
import { FooterComponent } from './footer/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    FooterComponent,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected apiServices= inject(ApiDjangoService);


}
