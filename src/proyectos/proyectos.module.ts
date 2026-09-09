import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { Department } from './departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Department])],
  controllers: [ProyectosController],
  providers: [ProyectosService],
})
export class ProyectosModule {}
