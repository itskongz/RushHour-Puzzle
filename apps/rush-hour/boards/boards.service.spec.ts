// boards/boards.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { Car, Move } from './models';

describe('BoardsService', () => {
    let service: BoardsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BoardsService],
        }).compile();

        service = module.get<BoardsService>(BoardsService);
    });

    it('should create a board successfully', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        const result = service.createBoard(grid);
        expect(result).toHaveProperty('boardId');
        expect(service['boards']).toHaveLength(1); // Check if the board was added
    });

    it('should start a game successfully', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        service.createBoard(grid);
        const result = service.startGame('0');
        expect(result).toHaveProperty('gameId');
        expect(service['games']).toHaveLength(1); // Check if the game was added
    });

    it('should get the game state successfully', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        service.createBoard(grid);
        service.startGame('0');
        const gameState = service.getGameState('0');
        expect(gameState).toHaveProperty('id', '0');
    });

    it('should return undefined for a non-existent game', () => {
        const gameState = service.getGameState('999');
        expect(gameState).toBeUndefined();
    });

    it('should move a car successfully', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        service.createBoard(grid);
        const boardId = service.createBoard(grid).boardId;
        service.startGame(boardId);
        
        const move: Move = { carId: 0, direction: 'right' };
        const result = service.moveCar(boardId, move);
        expect(result).toHaveProperty('message', 'Car moved successfully');
        expect(service['games'][0].moves).toHaveLength(1); // Check if the move was recorded
    });

    it('should return error for invalid game ID on move', () => {
        const move: Move = { carId: 0, direction: 'right' };
        const result = service.moveCar('999', move);
        expect(result).toHaveProperty('error', 'Game not found');
    });

    it('should return error for invalid car ID on move', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        service.createBoard(grid);
        const boardId = service.createBoard(grid).boardId;
        service.startGame(boardId);
        
        const move: Move = { carId: 999, direction: 'right' }; // Invalid car ID
        const result = service.moveCar('0', move);
        expect(result).toHaveProperty('error', 'Car not found');
    });

    it('should return error for invalid move', () => {
      const grid = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 2, 2, 2]
      ];
      service.createBoard(grid);
      const boardId = service.createBoard(grid).boardId;
      service.startGame(boardId);
      
      // Move the car to an invalid position (out of bounds)
      const move: Move = { carId: 0, direction: 'up' }; // Assuming car can't move up
      const result = service.moveCar(boardId, move);
      expect(result).toHaveProperty('error', 'Invalid move');
  });
  

    it('should solve the game when the red car reaches the exit', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        service.createBoard(grid);
        const boardId = service.createBoard(grid).boardId;
        service.startGame(boardId);
        
        // Move the red car to the exit
        const move: Move = { carId: 0, direction: 'right' }; // Move to exit
        service.moveCar('0', move);
        const result = service.moveCar('0', move); // Move again to reach exit
        expect(result).toHaveProperty('message', 'Game solved!');
    });
});
