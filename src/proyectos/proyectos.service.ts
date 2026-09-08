import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const department = await this.departmentsRepository.findOneBy({
      id: createProyectoDto.departamentoId,
    });

    if (!department) {
      throw new NotFoundException(
        `Department with id ${createProyectoDto.departamentoId} not found`,
      );
    }

    const proyecto = this.proyectosRepository.create(createProyectoDto);
    return this.proyectosRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    return this.proyectosRepository.find({
      relations: ['departamento'],
    });
  }

  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto with id ${id} not found`);
    }

    return proyecto;
  }

  async update(
    id: number,
    updateProyectoDto: UpdateProyectoDto,
  ): Promise<Proyecto> {
    const proyecto = await this.findOne(id);

    if (updateProyectoDto.departamentoId !== undefined) {
      const department = await this.departmentsRepository.findOneBy({
        id: updateProyectoDto.departamentoId,
      });

      if (!department) {
        throw new NotFoundException(
          `Department with id ${updateProyectoDto.departamentoId} not found`,
        );
      }
    }

    Object.assign(proyecto, updateProyectoDto);
    return this.proyectosRepository.save(proyecto);
  }

  async remove(id: number): Promise<void> {
    const proyecto = await this.findOne(id);
    await this.proyectosRepository.remove(proyecto);
  }
}
