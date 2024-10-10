// boards/boards.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Move } from './models';

describe('BoardsController', () => {
    let controller: BoardsController;
    let service: BoardsService;

    const mockBoardsService = {
        createBoard: jest.fn(),
        startGame: jest.fn(),
        getGameState: jest.fn(),
        moveCar: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardsController],
            providers: [
                {
                    provide: BoardsService,
                    useValue: mockBoardsService,
                },
            ],
        }).compile();

        controller = module.get<BoardsController>(BoardsController);
        service = module.get<BoardsService>(BoardsService);
    });

    it('should create a board successfully', () => {
        const grid = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2]
        ];
        mockBoardsService.createBoard.mockReturnValue({ boardId: '1' });

        const result = controller.createBoard(grid);
        expect(result).toEqual({
            message: 'Board created successfully',
            boardId: '1',
        });
        expect(mockBoardsService.createBoard).toHaveBeenCalledWith(grid);
    });

    it('should start a game successfully', () => {
        mockBoardsService.startGame.mockReturnValue({ gameId: '1' });

        const result = controller.startGame('1');
        expect(result).toEqual({
            message: 'Game started successfully',
            gameId: '1',
        });
        expect(mockBoardsService.startGame).toHaveBeenCalledWith('1');
    });

    it('should return game state successfully', () => {
        const gameState = { gameId: '1', moves: [] };
        mockBoardsService.getGameState.mockReturnValue(gameState);

        const result = controller.getGameState('1');
        expect(result).toEqual(gameState);
        expect(mockBoardsService.getGameState).toHaveBeenCalledWith('1');
    });

    it('should return error for game not found', () => {
        mockBoardsService.getGameState.mockReturnValue(null);

        const result = controller.getGameState('999');
        expect(result).toEqual({ error: 'Game not found' });
    });

    it('should move a car successfully', () => {
        const move: Move = { carId: 0, direction: 'right' };
        const moveResult = { message: 'Car moved successfully', moves: [] };
        mockBoardsService.moveCar.mockReturnValue(moveResult);

        const result = controller.moveCar('1', move);
        expect(result).toEqual(moveResult);
        expect(mockBoardsService.moveCar).toHaveBeenCalledWith('1', move);
    });

    it('should return error for invalid car move', () => {
        const move: Move = { carId: 999, direction: 'up' };
        const moveResult = { error: 'Car not found' };
        mockBoardsService.moveCar.mockReturnValue(moveResult);

        const result = controller.moveCar('1', move);
        expect(result).toEqual({ error: 'Car not found' });
        expect(mockBoardsService.moveCar).toHaveBeenCalledWith('1', move);
    });

    it('should return API documentation', () => {
        const result = controller.getDocs();
        expect(result).toHaveProperty('message', 'API Documentation');
        expect(result.endpoints).toBeDefined();
    });
});
