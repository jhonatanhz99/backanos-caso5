import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from '../../entities/project.entity';
import { Department } from '../../entities/department.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  // 1. CREAR PROYECTO
  async create(createProjectDto: CreateProjectDto) {
    const department = await this.departmentRepository.findOne({
      where: {
        id: createProjectDto.departmentId,
      },
    });

    if (!department) {
      throw new BadRequestException(
        'El departamento asignado no existe',
      );
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      department,
    });

    return await this.projectRepository.save(project);
  }

  // 2. LISTAR TODOS
  async findAll() {
    return await this.projectRepository.find({
      relations: {
        department: true,
      },
    });
  }

  // 3. BUSCAR POR ID
  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: {
        department: true,
      },
    });

    if (!project) {
      throw new NotFoundException(
        `Proyecto con ID ${id} no encontrado`,
      );
    }

    return project;
  }

  // 4. ACTUALIZAR
  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.findOne(id);

    if (updateProjectDto.departmentId !== undefined) {
      const department = await this.departmentRepository.findOne({
        where: {
          id: updateProjectDto.departmentId,
        },
      });

      if (!department) {
        throw new BadRequestException(
          'El departamento asignado no existe',
        );
      }

      project.department = department;
      project.departmentId = department.id;
    }

    Object.assign(project, updateProjectDto);

    return await this.projectRepository.save(project);
  }

  // 5. ELIMINAR
  async remove(id: number) {
    const project = await this.findOne(id);

    await this.projectRepository.remove(project);

    return {
      message: `Proyecto con ID ${id} eliminado correctamente`,
    };
  }
}