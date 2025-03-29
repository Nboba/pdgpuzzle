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
  solutionTime: number;
  SolutionNMoves: number;
  SolutionMoves: DungeonWMoves;
  SolutionDate: string;
  solutionLastTry: string;
}

export interface keySignal {
  key: string;
  move: number[];
}
