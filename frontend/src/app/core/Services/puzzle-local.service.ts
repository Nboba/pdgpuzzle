import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { ResponsePuzzleModel } from '../Models/request-puzzle-model';
import { filterPuzzleOptions } from '../Models/constant-values';
@Injectable({
  providedIn: 'root'
})
export class PuzzleLocalService {
  private _savedPuzzles=signal<ResponsePuzzleModel[]>([]);
  private _filterPuzzleOptions=signal('start');
  private _sortedPuzzles:Signal<number[]>=computed(()=> [...this.filterPuzzles(this.FilterPuzzleOptions)]);


  constructor() {
    let filter=localStorage.getItem('filterPuzzleOptions');
    let savePuzzles = localStorage.getItem('puzzlesSelected');
    if(savePuzzles!==null){
      this._savedPuzzles.set(JSON.parse(localStorage.getItem('puzzlesSelected')??''))
    }
    if(filter!==null && filter.length>0){
      this.FilterPuzzleOptions=filter;
    }
    else{
      localStorage.setItem('filterPuzzleOptions',filterPuzzleOptions.moves);
      this.FilterPuzzleOptions=filterPuzzleOptions.moves;
    }



    effect(() => { this._sortedPuzzles();});



  }

    public get savedPuzzles():ResponsePuzzleModel[]{
      return this._savedPuzzles();
    }
    public set savedPuzzles(puzzle:ResponsePuzzleModel[]){
      this._savedPuzzles.set([...this._savedPuzzles(),...puzzle]);
      localStorage.setItem('puzzlesSelected',JSON.stringify(this._savedPuzzles()));
      let filter=localStorage.getItem('filterPuzzleOptions');
      if(filter!==null && filter.length>0){
        this.FilterPuzzleOptions=filter
      }

    }

    public set FilterPuzzleOptions(filter:string){
      localStorage.setItem('filterPuzzleOptions',filter);
      this._filterPuzzleOptions.update(()=>{return filter});
    }
    public get FilterPuzzleOptions():string{
      return this._filterPuzzleOptions();
    }
    public get SortedPuzzles():number[]{
      return this._sortedPuzzles();
    }


    public filterPuzzles(filter:string):number[]{
      switch(filter){
        case filterPuzzleOptions.solutions:{
          return this.getIndexOfPuzzle([...this.savedPuzzles].sort((a:ResponsePuzzleModel,b:ResponsePuzzleModel)=>b.NSolutions-a.NSolutions));
        }
        case filterPuzzleOptions.time:{
          return this.getIndexOfPuzzle([...this.savedPuzzles].sort((a:ResponsePuzzleModel,b:ResponsePuzzleModel)=>b.PlayerSolution.solutionTime-a.PlayerSolution.solutionTime));
        }
        case filterPuzzleOptions.haveSolution:{
          return this.getIndexOfPuzzle([...this.savedPuzzles].filter((a:ResponsePuzzleModel)=>a.PlayerSolution.SolutionNMoves>0));
        }
        case filterPuzzleOptions.noSolution:{
          return this.getIndexOfPuzzle([...this.savedPuzzles].filter((a:ResponsePuzzleModel)=>a.PlayerSolution.SolutionNMoves==0));
        }
        default:{
          return this.getIndexOfPuzzle([...this.savedPuzzles].sort((a:ResponsePuzzleModel,b:ResponsePuzzleModel)=>a.NMoves-b.NMoves));
        }
      }
    }

    public getIndexOfPuzzle(sortedPuzzles:ResponsePuzzleModel[]):number[]{
      let index:number[]=[];
      sortedPuzzles.forEach((puzzle:ResponsePuzzleModel)=>{
        index.push(this.savedPuzzles.findIndex((puzz:ResponsePuzzleModel)=>puzzle.id.localeCompare(puzz.id)===0));
    })
    return index;
  }

  public getPuzzle(index:number):ResponsePuzzleModel{
    return this.savedPuzzles[index];
  }
  public getMetaData(index:number):[number,number]{
    return [this._savedPuzzles()[index].NMoves,this._savedPuzzles()[index].NSolutions];
  }
}
