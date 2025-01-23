export interface PuzzleModel {
    id: any;
    dungeon: any;
    nSol: any;
    minSol: any;
    solution: any;
    solutionPlayer: any;
    recordTime: any;
    recordMoves: any;
    public: any;
}


export interface GetResponse {
    dataDungeon: PuzzleModel[];
    response: string;
}
export interface getDummyResponse {
    data: [];
    response: string;
    code: number;
}

export interface PostResponse {
    data: any;
    message: string;
    status: number;
}
export interface UserLogin{
    username?: string;
    password?: string;
}

export interface UserRegister{
    username: string;
    password: string;
    email: string;
}