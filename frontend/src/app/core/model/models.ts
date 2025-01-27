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

export interface puzzleFormConfigurations{
    label:string,
    max:number,
    min:number,
    step:number,
    default:number,
    nameInput:string
}

export const puzzleFormConfigurations:puzzleFormConfigurations[]=[{'label':"altura",'max':10,'min':4,'step':1,'default':5,'nameInput':"height"}, //height
                                                                     {'label':"Ancho",'max':10,'min':4,'step':1,'default':5,'nameInput':"width"}, // widht
                                                                     {'label':"Factor de Expancion",'max':0.50,'min':0.01,'step':0.001,'default':0.13,'nameInput':"expantionFactor"}, //expantionFactor
                                                                     {'label':"Factor de Enemigos",'max':0.15,'min':0.01,'step':0.001,'default':0.083,'nameInput':"enemyFactor"}, //enemyFactor
                                                                     {'label':"Factor de de Cajas",'max':0.30,'min':0.01,'step':0.01,'default':0.12,'nameInput':"blockFactor"}, //blockFactor
                                                                     {'label':"Tamaño de la Poblacion",'max':25,'min':4,'step':1,'default':12,'nameInput':"nPop"}, //nPop
                                                                     {'label':"Maximo de Iteraciones",'max':80,'min':5,'step':1,'default':20,'nameInput':"maxIter"}, //maxIter
                                                                     {'label':"Maxima Cantidad de Movimientos",'max':60,'min':5,'step':1,'default':10,'nameInput':"maxMoves"}, //maxMoves
                                                                     {'label':"Factor de Mutacion",'max':0.99,'min':0.1,'step':0.01,'default':0.50,'nameInput':"mutationFactor"}]; //mutationFactor

                                                                     

