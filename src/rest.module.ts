import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';

@Module({
  imports: [],
  controllers: [RestController],
  providers: [],
})
export class RestModule {}
