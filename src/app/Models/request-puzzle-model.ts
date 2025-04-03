import { 
  DungeonWMoves,
  SolutionPlayer
 } from './interfaces-puzzle';

export interface RequestPuzzleModel {
  response: ResponsePuzzleModel[];
}
export interface ResponsePuzzleModel {
  id: string;
  Matrix: number[][];
  NSolutions: number;
  NMoves: number;
  PlayerPostions: number[];
  EnemyPositions: number[][];
  DoorPosition: number[];
  Solution: DungeonWMoves[];
  PlayerSolution: SolutionPlayer;
}

export interface RequestPetitionPuzzleModel {
  height: number;
  width: number;
  expantionFactor: number;
  enemyFactor: number;
  blockFactor: number;
  nPop: number;
  maxIter: number;
  mutationFactor: number;
  maxMoves: number;
  Npuzzles: number;
}

