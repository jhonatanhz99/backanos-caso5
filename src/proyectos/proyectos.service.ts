import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectosRepository: Repository<Proyecto>,
  ) {}

  // Método find: devuelve todos los proyectos con tareas y departamento
  async find(): Promise<Proyecto[]> {
    return this.proyectosRepository.find({
      relations: ['tareas', 'departamento'],
    });
  }

  // Método findOne: devuelve un proyecto por id con tareas y departamento
  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id },
      relations: ['tareas', 'departamento'],
    });
    return proyecto;
  }
}
