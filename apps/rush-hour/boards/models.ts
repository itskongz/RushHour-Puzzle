// boards/models.ts
export type MovementDirection = 'up' | 'down' | 'left' | 'right';

export interface Car {
  id: number;
  length: number;
  position: { row: number; col: number };
  orientation: 'horizontal' | 'vertical';
}

export interface Board {
  grid: number[][];
  cars: Car[];
}

export interface Move {
  carId: number;
  direction: MovementDirection;
}

export interface Step {
  carId: number;
  direction: MovementDirection;
}
