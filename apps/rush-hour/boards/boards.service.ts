import { Injectable } from '@nestjs/common';
import { Board, Car, Move, Step,MovementDirection } from './models';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // Store boards
  private games: any[] = []; // Store games

  createBoard(board: number[][]) {
    const cars: Car[] = this.initializeCars(board);
    const boardId = this.boards.length.toString();
    this.boards.push({ grid: board, cars });
    return { boardId };
  }

  startGame(boardId: string) {
    const gameId = this.games.length.toString();
    this.games.push({ id: gameId, boardId, moves: [], lastMove: Date.now() });
    return { gameId };
  }

  getGameState(gameId: string) {
    return this.games.find((game) => game.id === gameId);
  }

  async moveCar(gameId: string, move: Move) {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) return { error: 'Game not found' };

    const board = this.boards[parseInt(game.boardId)];
    const car = board.cars.find((c) => c.id === move.carId);

    if (!car) return { error: 'Car not found' };

    const originalPosition = { ...car.position };

    //Check if the puzzle is solved
    if(this.isRushHourSolved(board.grid)){
      return {message: 'Puzzle is solved successfully'}
    }

    const previousMinMoves = await this.calculateMinimumMoves(board);
    console.log("previousMinMoves:", previousMinMoves.moves)
    // Check if the move is valid
    if (!this.isValidMove(board, car, move.direction)) {
      car.position = originalPosition; // Revert back to the original position
      return { error: 'Invalid move' };
    }

    // Move the car based on the direction
    if (move.direction === 'up' && car.orientation === 'vertical') {
        car.position.row -= 1;
    } else if (move.direction === 'down' && car.orientation === 'vertical') {
        car.position.row += 1;
    } else if (move.direction === 'left' && car.orientation === 'horizontal') {
        car.position.col -= 1;
    } else if (move.direction === 'right' && car.orientation === 'horizontal') {
        car.position.col += 1;
    }

    this.updateBoardGrid(board, car, originalPosition);
    // Calculate new minimum moves
    const newMinMoves = await this.calculateMinimumMoves(board);
    console.log("newMinMoves:", newMinMoves.moves)

    // Categorize the move
    let moveType: string;
    if (newMinMoves.moves < previousMinMoves.moves) {
      moveType = 'good';
    } else if (newMinMoves.moves === previousMinMoves.moves) {
      moveType = 'waste';
    } else {
      moveType = 'blunder';
    }

    game.moves.push({ carId: car.id, direction: move.direction, moveType });
    game.lastMove = Date.now();

    return { message: 'Car moved successfully', moves: game.moves };
}

private async calculateMinimumMoves(board: Board): Promise<{ moves: number; steps: Step[] }> {
  const queue: { grid: number[][]; moves: number; cars: Car[]; steps: Step[] }[] = [
    { grid: board.grid, moves: 0, cars: this.copyCars(board.cars), steps: [] }
  ];
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const { grid, moves, cars, steps } = queue.shift()!;

    if (this.isRushHourSolved(grid)) {
      return { moves, steps }; // Return the number of moves and the steps taken
    }

    for (const car of cars) {
      for (const direction of ['up', 'down', 'left', 'right'] as MovementDirection[]) {
        const newGrid = this.moveCarInGrid(grid, car, direction);
        if (newGrid && !this.isGridVisited(newGrid, visited)) {
          visited.add(this.gridToString(newGrid));
          const newSteps = [...steps, { carId: car.id, direction }]; // Track the steps
          queue.push({ grid: newGrid, moves: moves + 1, cars: this.copyCars(cars), steps: newSteps }); // Push new state
        }
      }
    }
  }
  return { moves: Infinity, steps: [] }; // If no solution is found
}

private copyCars(cars: Car[]): Car[] {
  return cars.map(car => ({
    ...car,
    position: { ...car.position } // Deep copy of position
  }));
}

private moveCarInGrid(grid: number[][], car: Car, direction: MovementDirection): number[][] | null {
  const newGrid = grid.map(row => [...row]); // Create a copy of the grid
  const newCar = { ...car, position: { ...car.position } }; // Create a copy of the car

  // Determine the movement based on the car's orientation
  if (newCar.orientation === 'horizontal') {
    if (direction === 'left' && newCar.position.col > 0 && newGrid[newCar.position.row][newCar.position.col - 1] === 0) {
      newGrid[newCar.position.row][newCar.position.col + 1] = 0; // Clear the old position
      newGrid[newCar.position.row][newCar.position.col - 1] = newCar.id; // Update new position
      newCar.position.col -= 1; // Update car's position
    } else if (direction === 'right' && newCar.position.col + newCar.length < grid[0].length && 
               newGrid[newCar.position.row][newCar.position.col + newCar.length] === 0) {
      newGrid[newCar.position.row][newCar.position.col + newCar.length] = newCar.id; // Update new position
      newGrid[newCar.position.row][newCar.position.col] = 0; // Clear the old position
      newCar.position.col += 1; // Update car's position
    } else {
      return null; // Invalid move
    }
  } else if (newCar.orientation === 'vertical') {
    if (direction === 'up' && newCar.position.row > 0 && newGrid[newCar.position.row - 1][newCar.position.col] === 0) {
      newGrid[newCar.position.row + 1][newCar.position.col] = 0; // Clear the old position
      newGrid[newCar.position.row - 1][newCar.position.col] = newCar.id; // Update new position
      newCar.position.row -= 1; // Update car's position
    } else if (direction === 'down' && newCar.position.row + newCar.length < grid.length && 
               newGrid[newCar.position.row + newCar.length - 1][newCar.position.col] === 0) {
      newGrid[newCar.position.row][newCar.position.col] = 0; // Clear the old position
      newGrid[newCar.position.row + newCar.length][newCar.position.col] = newCar.id; // Update new position
      newCar.position.row += 1; // Update car's position
    } else {
      return null; // Invalid move
    }
  }

  return newGrid; // Return the updated grid
}



private isGridVisited(grid: number[][], visited: Set<string>): boolean {
  return visited.has(this.gridToString(grid));
}

private gridToString(grid: number[][]): string {
  return grid.map(row => row.join(',')).join(';');
}

private isRushHourSolved(board: number[][]): boolean {
  for (let row = 0; row < board.length; row++) {
      if (board[row][board[row].length - 1] === 1) {
          return true; // Red car is in the exit position
      }
  }
  return false; // Red car is not in the exit position
}

private updateBoardGrid(board: Board, car: Car, originalPosition: { row: number; col: number }) {
  for (let i = 0; i < car.length; i++) {
      if (car.orientation === 'horizontal') {
          board.grid[originalPosition.row][originalPosition.col + i] = 0;
      } else {
          board.grid[originalPosition.row + i][originalPosition.col] = 0;
      }
  }

  for (let i = 0; i < car.length; i++) {
      if (car.orientation === 'horizontal') {
          board.grid[car.position.row][car.position.col + i] = car.id;
      } else {
          board.grid[car.position.row + i][car.position.col] = car.id;
      }
  }
}

private initializeCars(grid: number[][]): Car[] {
  const cars: Car[] = [];
  const visited: boolean[][] = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));

  for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
          if (grid[row][col] !== 0 && !visited[row][col]) {
              const id = grid[row][col];
              const length = this.detectCarLength(grid, row, col, id);
              const orientation = this.detectOrientation(grid, row, col, length);

              for (let i = 0; i < length; i++) {
                  if (orientation === 'horizontal') {
                      visited[row][col + i] = true;
                  } else {
                      visited[row + i][col] = true;
                  }
              }

              cars.push({
                  id: grid[row][col],
                  length: length,
                  position: { row: row, col: col },
                  orientation: orientation,
              });
          }
      }
  }
  return cars;
}

private detectCarLength(grid: number[][], row: number, col: number, id: number): number {
  let length = 1;
  while (col + length < grid[0].length && grid[row][col + length] === id) {
      length++;
  }
  if (length === 1) {
      while (row + length < grid.length && grid[row + length][col] === id) {
          length++;
      }
  }
  return length;
}

private detectOrientation(grid: number[][], row: number, col: number, length: number): 'horizontal' | 'vertical' {
  if (length > 0 && grid[row][col + length - 1] === grid[row][col]) {
      return 'horizontal';
  } else {
      return 'vertical';
  }
}

private isValidMove(board: Board, car: Car, direction: String): boolean {
    const { row, col } = car.position;
    let val = 0;
    if(direction == "right") val = 1;
    if(direction == "left") val = -1;
    if(direction == "up") val = -1;
    if(direction == "down") val = 1;

    if (car.orientation === 'horizontal') {
      if (col + val < 0 || col + car.length + val > board.grid[0].length) return false; // Out of bounds
      for (let i = 0; i < car.length; i++) {
          if (board.grid[row][col + i + val] !== 0 && board.grid[row][col + i + val] !== board.grid[row][col]) return false; // Collision with another car
      }
    } else { // Vertical
        if (row + val < 0 || row + car.length + val > board.grid.length) return false; // Out of bounds
        for (let i = 0; i < car.length; i++) {
            if (board.grid[row + i + val][col] !== 0 && board.grid[row + i + val][col] !== board.grid[row][col]) return false; // Collision with another car
        }
    }
    return true;
}
}
