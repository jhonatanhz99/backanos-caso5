import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Task]), DepartmentsModule],
  controllers: [ProyectosController],
  providers: [ProyectosService],
})
export class ProyectosModule {}
