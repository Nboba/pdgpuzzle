
import { keySignal } from './interfaces-puzzle';

export const cellColors = ['white', 'grey', '#994318', 'red', 'green', 'blue'];

export enum filterPuzzleOptions {
  moves = 'moves',
  solutions = 'solutions',
  haveSolution = 'haveSolution',
  noSolution = 'noSolution',
  time = 'time',
}

export const filterPuzzleOptionsArray = [
  'Moves',
  'Solutions',
  'haveSolution',
  'noSolution',
  'time',
];

export const SignalType: keySignal[] = [
  { key: 'ArrowUp', move: [-1, 0] },
  { key: 'ArrowDown', move: [1, 0] },
  { key: 'ArrowRight', move: [0, 1] },
  { key: 'ArrowLeft', move: [0, -1] },
];
