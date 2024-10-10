import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CleanupService {
  private games: any[] = []; // Reference to games

  @Cron('*/10 * * * * *') // Runs every 10 seconds
  handleCron() {
    const now = Date.now();
    this.games = this.games.filter((game) => {
      // Keep games with moves in the last 5 minutes
      return now - game.lastMove < 5 * 60 * 1000;
    });
    console.log('Cleaned up inactive games');
  }
}
