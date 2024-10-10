import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Move } from './models';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('create-board')
  createBoard(@Body() board: number[][]) {
    const result = this.boardsService.createBoard(board);
    return { message: 'Board created successfully', ...result };
  }

  @Post('start-game/:boardId')
  startGame(@Param('boardId') boardId: string) {
    const result = this.boardsService.startGame(boardId);
    return { message: 'Game started successfully', ...result };
  }

  @Get('game/:gameId')
  getGameState(@Param('gameId') gameId: string) {
    const gameState = this.boardsService.getGameState(gameId);
    if (!gameState) {
      return { error: 'Game not found' };
    }
    return gameState;
  }

  @Put('move-car/:gameId')
  async moveCar(@Param('gameId') gameId: string, @Body() move: Move) {
    const result = await this.boardsService.moveCar(gameId, move);
    if (result.error) {
      return { error: result.error };
    }
    return { message: result.message, moves: result.moves };
  }

  @Get('docs')
  getDocs() {
    return {
      message: 'API Documentation',
      endpoints: [
        {
          method: 'POST',
          path: '/boards/create-board',
          description: 'Create a new game board',
        },
        {
          method: 'POST',
          path: '/boards/start-game/:boardId',
          description: 'Start a game with the specified board',
        },
        {
          method: 'GET',
          path: '/boards/game/:gameId',
          description: 'Get the current state of the game',
        },
        {
          method: 'PUT',
          path: '/boards/move-car/:gameId',
          description: 'Move a car in the game',
        },
        {
          method: 'GET',
          path: '/boards/docs',
          description: 'API Documentation',
        },
      ],
    };
  }
}
