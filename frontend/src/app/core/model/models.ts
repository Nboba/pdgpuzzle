export interface Puzzle{
    puzzle :any|[];
    playeri_j :any|[];
}

export const SignalType:keySignal[]=[{'key':'ArrowUp','move':[-1,0]},
                                     {'key':'ArrowDown','move':[1,0]},
                                     {'key':'ArrowRight','move':[0,1]},
                                     {'key':'ArrowLeft','move':[0,-1]}];
    
export interface keySignal{
    key:string;
    move:number[];
}