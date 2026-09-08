import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const proyecto = await this.proyectosRepository.findOneBy({
      id: createTaskDto.proyectoId,
    });
    if (!proyecto) {
      throw new NotFoundException(
        `Proyecto with id ${createTaskDto.proyectoId} not found`,
      );
    }

    const empleado = await this.employeesRepository.findOneBy({
      id: createTaskDto.empleadoId,
    });
    if (!empleado) {
      throw new NotFoundException(
        `Employee with id ${createTaskDto.empleadoId} not found`,
      );
    }

    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: ['proyecto', 'empleado'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['proyecto', 'empleado'],
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.proyectoId !== undefined) {
      const proyecto = await this.proyectosRepository.findOneBy({
        id: updateTaskDto.proyectoId,
      });
      if (!proyecto) {
        throw new NotFoundException(
          `Proyecto with id ${updateTaskDto.proyectoId} not found`,
        );
      }
    }

    if (updateTaskDto.empleadoId !== undefined) {
      const empleado = await this.employeesRepository.findOneBy({
        id: updateTaskDto.empleadoId,
      });
      if (!empleado) {
        throw new NotFoundException(
          `Employee with id ${updateTaskDto.empleadoId} not found`,
        );
      }
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }
}
