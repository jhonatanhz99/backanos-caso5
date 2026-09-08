import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Proyecto, Employee])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
