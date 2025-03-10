import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormRecord } from '@angular/forms';
import {PuzzleFormConfigurationsModel,RequestPetitionPuzzleModel } from '../Models/request-puzzle-model';
import {puzzleFormConfigurations} from '../Models/constant-values';
import { PuzzleApiService } from '../Services/puzzle-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalPuzzleResultComponent } from '../modal-puzzle-result/modal-puzzle-result.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'form-puzzle-petition',
  imports: [
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ],
  templateUrl: './form-puzzle-petition.component.html',
  styleUrl: './form-puzzle-petition.component.scss'
})
export class FormPuzzlePetitionComponent {
  protected readonly dialog = inject(MatDialog);
  protected PetitionPuzleForm = new FormRecord<FormControl>({});
  protected formConfiguration : PuzzleFormConfigurationsModel[];
  protected nPuzzles=signal(1);
  readonly  nPuzzlesValues = Array.from({ length: 10 }, (_, i) => i + 1);
  protected petitonActive=signal(false);

  constructor(private apiPuzzle:PuzzleApiService)
    {
      this.formConfiguration=puzzleFormConfigurations;
      this.formConfiguration.forEach((config:PuzzleFormConfigurationsModel)=>{
        this.PetitionPuzleForm.addControl(config.nameInput,new FormControl(config.default));
      })

    }

    getForm(name:string):FormControl{
      return this.PetitionPuzleForm.get(name) as FormControl;
    }
    getValue(name:string):number{
        return (this.PetitionPuzleForm.get(name) as FormControl).value ;
    }

    generatePuzzle(Npuzzles:number){
      this.petitonActive.set(true);
      let request:RequestPetitionPuzzleModel={
        height:this.getValue('height'),
        width:this.getValue('width'),
        expantionFactor:this.getValue('expantionFactor'),
        enemyFactor:this.getValue('enemyFactor'),
        blockFactor:this.getValue('blockFactor'),
        nPop:this.getValue('nPop'),
        maxIter:this.getValue('maxIter'),
        mutationFactor:this.getValue('mutationFactor'),
        maxMoves:this.getValue('maxMoves'),
        Npuzzles:Npuzzles
      }
      this.apiPuzzle.getNPuzzle(request).subscribe({
        next: data=>{
          this.apiPuzzle.puzzleResult=data.response;
          this.openDialog();
      },
        error: error=>{
                console.log(error)
              },
        complete()  {
          console.log('Observable emitted the complete notification');

        }
          });


    }

    openDialog(): void {
      this.dialog.open(ModalPuzzleResultComponent,
        {
          width: '100vw',
          maxWidth: '70vw'
      });
      this.dialog.afterAllClosed.subscribe(result => {
        this.petitonActive.set(false);
        this.apiPuzzle.resetResults();
      });
    }


}

