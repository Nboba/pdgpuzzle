import { Component, inject } from '@angular/core';
import { ApiDjangoService } from './userSesion/services/api-django.service';
import { MenuComponent } from './navBar/menu/menu.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BodyContentComponent } from './core/body-content/body-content.component';
import { FooterComponent } from './footer/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  protected apiServices= inject(ApiDjangoService);

/*   constructor(){
     this.apiServices.getPuzzles().subscribe((data)=>{
      console.log(data);
    });
  } */
}
