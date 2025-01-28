import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormRecord} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import{puzzleFormConfigurations,PetitionPuzzleApi} from '../model/models';
import{PetitionPuzzleService } from '../services/petition-puzzle.service';

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

    constructor( private petitionService:PetitionPuzzleService)
    { 
      this.formConfiguration=puzzleFormConfigurations;
      this.formConfiguration.map((config:puzzleFormConfigurations)=>{
        this.PetitionPuzleForm.addControl(config.nameInput,new FormControl(config.default));
      })

    }

    enviarPetition()
    {
        let petition:PetitionPuzzleApi={height:this.getValue('height'),
                                        width:this.getValue('width'),
                                        expantionFactor:this.getValue('expantionFactor'),
                                        enemyFactor:this.getValue('enemyFactor'),
                                        blockFactor:this.getValue('blockFactor'),
                                        nPop:this.getValue('nPop'),
                                        maxIter:this.getValue('maxIter'),
                                        maxMoves:this.getValue('maxMoves'),
                                        mutationFactor:this.getValue('mutationFactor')};
        console.log(petition);
        this.petitionService.postPetition(petition).subscribe((response)=>{
            console.log(response);
        });
    }
    getForm(name:string):FormControl{
        return this.PetitionPuzleForm.get(name) as FormControl;
    }
    getValue(name:string):number{
        return (this.PetitionPuzleForm.get(name) as FormControl).value ;
    }
}
