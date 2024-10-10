/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const boards_module_1 = __webpack_require__(5);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'password',
                database: 'RushHour',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            boards_module_1.BoardsModule,
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardsModule = void 0;
const common_1 = __webpack_require__(3);
const boards_controller_1 = __webpack_require__(6);
const boards_service_1 = __webpack_require__(7);
let BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule;
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boards_controller_1.BoardsController],
        providers: [boards_service_1.BoardsService]
    })
], BoardsModule);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardsController = void 0;
const common_1 = __webpack_require__(3);
const boards_service_1 = __webpack_require__(7);
const models_1 = __webpack_require__(8);
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    createBoard(board) {
        const result = this.boardsService.createBoard(board);
        return { message: 'Board created successfully', ...result };
    }
    startGame(boardId) {
        const result = this.boardsService.startGame(boardId);
        return { message: 'Game started successfully', ...result };
    }
    getGameState(gameId) {
        const gameState = this.boardsService.getGameState(gameId);
        if (!gameState) {
            return { error: 'Game not found' };
        }
        return gameState;
    }
    async moveCar(gameId, move) {
        const result = await this.boardsService.moveCar(gameId, move);
        if (result.error) {
            return { error: result.error };
        }
        return { message: result.message, moves: result.moves };
    }
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
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)('create-board'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Post)('start-game/:boardId'),
    __param(0, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "startGame", null);
__decorate([
    (0, common_1.Get)('game/:gameId'),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getGameState", null);
__decorate([
    (0, common_1.Put)('move-car/:gameId'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof models_1.Move !== "undefined" && models_1.Move) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "moveCar", null);
__decorate([
    (0, common_1.Get)('docs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getDocs", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [typeof (_a = typeof boards_service_1.BoardsService !== "undefined" && boards_service_1.BoardsService) === "function" ? _a : Object])
], BoardsController);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardsService = void 0;
const common_1 = __webpack_require__(3);
let BoardsService = class BoardsService {
    constructor() {
        this.boards = [];
        this.games = [];
    }
    createBoard(board) {
        const cars = this.initializeCars(board);
        const boardId = this.boards.length.toString();
        this.boards.push({ grid: board, cars });
        return { boardId };
    }
    startGame(boardId) {
        const gameId = this.games.length.toString();
        this.games.push({ id: gameId, boardId, moves: [], lastMove: Date.now() });
        return { gameId };
    }
    getGameState(gameId) {
        return this.games.find((game) => game.id === gameId);
    }
    async moveCar(gameId, move) {
        const game = this.games.find((g) => g.id === gameId);
        if (!game)
            return { error: 'Game not found' };
        const board = this.boards[parseInt(game.boardId)];
        const car = board.cars.find((c) => c.id === move.carId);
        if (!car)
            return { error: 'Car not found' };
        const originalPosition = { ...car.position };
        if (this.isRushHourSolved(board.grid)) {
            return { message: 'Puzzle is solved successfully' };
        }
        const previousMinMoves = await this.calculateMinimumMoves(board);
        console.log("previousMinMoves:", previousMinMoves.moves);
        if (!this.isValidMove(board, car, move.direction)) {
            car.position = originalPosition;
            return { error: 'Invalid move' };
        }
        if (move.direction === 'up' && car.orientation === 'vertical') {
            car.position.row -= 1;
        }
        else if (move.direction === 'down' && car.orientation === 'vertical') {
            car.position.row += 1;
        }
        else if (move.direction === 'left' && car.orientation === 'horizontal') {
            car.position.col -= 1;
        }
        else if (move.direction === 'right' && car.orientation === 'horizontal') {
            car.position.col += 1;
        }
        this.updateBoardGrid(board, car, originalPosition);
        const newMinMoves = await this.calculateMinimumMoves(board);
        console.log("newMinMoves:", newMinMoves.moves);
        let moveType;
        if (newMinMoves.moves < previousMinMoves.moves) {
            moveType = 'good';
        }
        else if (newMinMoves.moves === previousMinMoves.moves) {
            moveType = 'waste';
        }
        else {
            moveType = 'blunder';
        }
        game.moves.push({ carId: car.id, direction: move.direction, moveType });
        game.lastMove = Date.now();
        return { message: 'Car moved successfully', moves: game.moves };
    }
    async calculateMinimumMoves(board) {
        const queue = [
            { grid: board.grid, moves: 0, cars: this.copyCars(board.cars), steps: [] }
        ];
        const visited = new Set();
        while (queue.length > 0) {
            const { grid, moves, cars, steps } = queue.shift();
            if (this.isRushHourSolved(grid)) {
                return { moves, steps };
            }
            for (const car of cars) {
                for (const direction of ['up', 'down', 'left', 'right']) {
                    const newGrid = this.moveCarInGrid(grid, car, direction);
                    if (newGrid && !this.isGridVisited(newGrid, visited)) {
                        visited.add(this.gridToString(newGrid));
                        const newSteps = [...steps, { carId: car.id, direction }];
                        queue.push({ grid: newGrid, moves: moves + 1, cars: this.copyCars(cars), steps: newSteps });
                    }
                }
            }
        }
        return { moves: Infinity, steps: [] };
    }
    copyCars(cars) {
        return cars.map(car => ({
            ...car,
            position: { ...car.position }
        }));
    }
    moveCarInGrid(grid, car, direction) {
        const newGrid = grid.map(row => [...row]);
        const newCar = { ...car, position: { ...car.position } };
        if (newCar.orientation === 'horizontal') {
            if (direction === 'left' && newCar.position.col > 0 && newGrid[newCar.position.row][newCar.position.col - 1] === 0) {
                newGrid[newCar.position.row][newCar.position.col + 1] = 0;
                newGrid[newCar.position.row][newCar.position.col - 1] = newCar.id;
                newCar.position.col -= 1;
            }
            else if (direction === 'right' && newCar.position.col + newCar.length < grid[0].length &&
                newGrid[newCar.position.row][newCar.position.col + newCar.length] === 0) {
                newGrid[newCar.position.row][newCar.position.col + newCar.length] = newCar.id;
                newGrid[newCar.position.row][newCar.position.col] = 0;
                newCar.position.col += 1;
            }
            else {
                return null;
            }
        }
        else if (newCar.orientation === 'vertical') {
            if (direction === 'up' && newCar.position.row > 0 && newGrid[newCar.position.row - 1][newCar.position.col] === 0) {
                newGrid[newCar.position.row + 1][newCar.position.col] = 0;
                newGrid[newCar.position.row - 1][newCar.position.col] = newCar.id;
                newCar.position.row -= 1;
            }
            else if (direction === 'down' && newCar.position.row + newCar.length < grid.length &&
                newGrid[newCar.position.row + newCar.length - 1][newCar.position.col] === 0) {
                newGrid[newCar.position.row][newCar.position.col] = 0;
                newGrid[newCar.position.row + newCar.length][newCar.position.col] = newCar.id;
                newCar.position.row += 1;
            }
            else {
                return null;
            }
        }
        return newGrid;
    }
    isGridVisited(grid, visited) {
        return visited.has(this.gridToString(grid));
    }
    gridToString(grid) {
        return grid.map(row => row.join(',')).join(';');
    }
    isRushHourSolved(board) {
        for (let row = 0; row < board.length; row++) {
            if (board[row][board[row].length - 1] === 1) {
                return true;
            }
        }
        return false;
    }
    updateBoardGrid(board, car, originalPosition) {
        for (let i = 0; i < car.length; i++) {
            if (car.orientation === 'horizontal') {
                board.grid[originalPosition.row][originalPosition.col + i] = 0;
            }
            else {
                board.grid[originalPosition.row + i][originalPosition.col] = 0;
            }
        }
        for (let i = 0; i < car.length; i++) {
            if (car.orientation === 'horizontal') {
                board.grid[car.position.row][car.position.col + i] = car.id;
            }
            else {
                board.grid[car.position.row + i][car.position.col] = car.id;
            }
        }
    }
    initializeCars(grid) {
        const cars = [];
        const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                if (grid[row][col] !== 0 && !visited[row][col]) {
                    const id = grid[row][col];
                    const length = this.detectCarLength(grid, row, col, id);
                    const orientation = this.detectOrientation(grid, row, col, length);
                    for (let i = 0; i < length; i++) {
                        if (orientation === 'horizontal') {
                            visited[row][col + i] = true;
                        }
                        else {
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
    detectCarLength(grid, row, col, id) {
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
    detectOrientation(grid, row, col, length) {
        if (length > 0 && grid[row][col + length - 1] === grid[row][col]) {
            return 'horizontal';
        }
        else {
            return 'vertical';
        }
    }
    isValidMove(board, car, direction) {
        const { row, col } = car.position;
        let val = 0;
        if (direction == "right")
            val = 1;
        if (direction == "left")
            val = -1;
        if (direction == "up")
            val = -1;
        if (direction == "down")
            val = 1;
        if (car.orientation === 'horizontal') {
            if (col + val < 0 || col + car.length + val > board.grid[0].length)
                return false;
            for (let i = 0; i < car.length; i++) {
                if (board.grid[row][col + i + val] !== 0 && board.grid[row][col + i + val] !== board.grid[row][col])
                    return false;
            }
        }
        else {
            if (row + val < 0 || row + car.length + val > board.grid.length)
                return false;
            for (let i = 0; i < car.length; i++) {
                if (board.grid[row + i + val][col] !== 0 && board.grid[row + i + val][col] !== board.grid[row][col])
                    return false;
            }
        }
        return true;
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)()
], BoardsService);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;