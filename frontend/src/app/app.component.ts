import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormPuzzlePetitionComponent } from './core/form-puzzle-petition/form-puzzle-petition.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PuzzleContainerComponent } from './core/puzzle-container/puzzle-container.component';
import { ToolbarManageService } from './core/Services/toolbar-manage.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            MatToolbarModule,
            MatButtonModule,
            MatButtonToggleModule,
            FormPuzzlePetitionComponent,
            PuzzleContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Krono-lt-1';
  protected PuzzleView=computed(()=>this.toolBar.PuzzleView);
  protected activeButton='border: .5rem solid var(--puzzle-background);';

  constructor(private toolBar:ToolbarManageService) {
   }
  changeView(){
    this.toolBar.changeView();
  }
}
