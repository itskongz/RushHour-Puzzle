import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class GameService {
  @MessagePattern('move-car')
  handleMoveCar(data: any) {
    console.log('Processing move:', data);
  }
}
