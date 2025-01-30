import { Component, input } from '@angular/core';


@Component({
  selector: 'puzzle-row',
  imports: [
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  public row= input([],{transform: this.getNumberArray});

  getNumberArray(row: number[] | undefined): number[] {
    return (row ?? [] ) as number[];
  }
  
}
