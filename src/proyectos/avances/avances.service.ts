import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { TaskStatus } from '../../tasks/entities/task.entity';

@Injectable()
export class AvancesService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async getProyectoConAvance(id: number) {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['departamento', 'tareas', 'tareas.empleado'],
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
    }

    const totalTareas = proyecto.tareas?.length || 0;
    const tareasCompletadas =
      proyecto.tareas?.filter((t) => t.estado === TaskStatus.COMPLETADA)
        .length || 0;
    const porcentajeProgreso =
      totalTareas > 0
        ? Math.round((tareasCompletadas / totalTareas) * 100)
        : 0;

    return {
      ...proyecto,
      porcentajeProgreso,
    };
  }
}