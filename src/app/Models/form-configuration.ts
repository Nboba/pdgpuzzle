export interface PuzzleFormConfigurationsModel {
    label: string;
    max: number;
    min: number;
    step: number;
    default: number;
    nameInput: string;
  }

  
export const puzzleFormConfigurations: PuzzleFormConfigurationsModel[] = [
    {
      label: 'Altura',
      max: 10,
      min: 6,
      step: 1,
      default: 6,
      nameInput: 'height',
    }, //height
    { label: 'Ancho', max: 10, min: 6, step: 1, default: 6, nameInput: 'width' }, // widht
    {
      label: 'Factor de Expancion',
      max: 0.35,
      min: 0.01,
      step: 0.001,
      default: 0.13,
      nameInput: 'expantionFactor',
    }, //expantionFactor
    {
      label: 'Factor de Enemigos',
      max: 0.2,
      min: 0.01,
      step: 0.001,
      default: 0.083,
      nameInput: 'enemyFactor',
    }, //enemyFactor
    {
      label: 'Factor de cajas',
      max: 0.25,
      min: 0.01,
      step: 0.01,
      default: 0.12,
      nameInput: 'blockFactor',
    }, //blockFactor
    {
      label: 'Tamaño de la Poblacion',
      max: 25,
      min: 4,
      step: 1,
      default: 12,
      nameInput: 'nPop',
    }, //nPop
    {
      label: 'Maximo de Iteraciones',
      max: 40,
      min: 5,
      step: 1,
      default: 20,
      nameInput: 'maxIter',
    }, //maxIter
    {
      label: 'Movimientos Maximos',
      max: 25,
      min: 5,
      step: 1,
      default: 14,
      nameInput: 'maxMoves',
    }, //maxMoves
    {
      label: 'Factor de Mutacion',
      max: 0.99,
      min: 0.1,
      step: 0.01,
      default: 0.5,
      nameInput: 'mutationFactor',
    },
  ]; //mutationFactor