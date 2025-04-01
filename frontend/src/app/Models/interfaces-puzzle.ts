export interface puzzleSelected {
  index: number;
  selected: boolean;
}

export interface DungeonWMoves {
  Dungeon: number[][];
  Move: string;
  MoveCoord: number[];
}

export interface SolutionPlayer {
  SolutionTime: number;
  SolutionNMoves: number;
  SolutionMoves: DungeonWMoves;
  SolutionDate: string;
  solutionLastTry: string;
}

export interface keySignal {
  key: string;
  move: number[];
}

export interface IndexFront{
  index: number;
  id: string;
}