import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}

  create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const proyecto = this.proyectosRepository.create(createProyectoDto);
    return this.proyectosRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    return this.proyectosRepository.find();
  }

  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOneBy({ id });

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
    Object.assign(proyecto, updateProyectoDto);
    return this.proyectosRepository.save(proyecto);
  }

  async remove(id: number): Promise<void> {
    const proyecto = await this.findOne(id);
    await this.proyectosRepository.remove(proyecto);
  }
}
