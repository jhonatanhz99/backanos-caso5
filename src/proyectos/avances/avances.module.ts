import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvancesController } from './avances.controller';
import { AvancesService } from './avances.service';
import { Proyecto } from '../entities/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto])],
  controllers: [AvancesController],
  providers: [AvancesService],
  exports: [AvancesService],
})
export class AvancesModule {}