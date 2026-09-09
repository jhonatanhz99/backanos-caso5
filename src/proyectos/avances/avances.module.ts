import { Module } from '@nestjs/common';
import { AvancesController } from './avances.controller';
import { AvancesService } from './avances.service';

@Module({
  controllers: [AvancesController],
  providers: [AvancesService],
  exports: [AvancesService]
})
export class AvancesModule {}
