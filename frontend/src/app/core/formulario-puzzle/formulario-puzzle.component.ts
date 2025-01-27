import { Component } from '@angular/core';
import {FormGroup, FormControl,ReactiveFormsModule, FormRecord} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatSliderModule} from '@angular/material/slider';
import{puzzleFormConfigurations} from '../model/models';

@Component({
  selector: 'app-formulario-puzzle',
  imports: [MatButtonModule,
            ReactiveFormsModule,
                MatButtonModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                MatSliderModule

  ],
  templateUrl: './formulario-puzzle.component.html',
  styleUrl: './formulario-puzzle.component.css'
})
export class FormularioPuzzleComponent {

    protected PetitionPuzleForm = new FormRecord<FormControl>({});
    protected formConfiguration:puzzleFormConfigurations[];

    constructor() { 
      this.formConfiguration=puzzleFormConfigurations;
      this.formConfiguration.map((config:puzzleFormConfigurations)=>{
        this.PetitionPuzleForm.addControl(config.nameInput,new FormControl(config.default));
      })

    }
    enviarPetition()
    {

    }
    getForm(name:string):FormControl{
        return this.PetitionPuzleForm.get(name) as FormControl;
    }
}
