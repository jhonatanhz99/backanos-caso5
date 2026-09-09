import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Proyecto } from '../entities/proyecto.entity'; // A importar cuando se una la rama 3

@Injectable()
export class AvancesService {
  // constructor(
  //   @InjectRepository(Proyecto)
  //   private proyectoRepository: Repository<Proyecto>,
  // ) {}

  getProyectoConAvance(id: number) {
    /* 
      NOTA: Esta es la estructura que se usará cuando la entidad Proyecto 
      sea creada por el Integrante 3.
      
      const proyecto = await this.proyectoRepository.findOne({
        where: { id },
        relations: ['departamento', 'tareas', 'tareas.empleado'],
      });

      if (!proyecto) {
        throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
      }

      const totalTareas = proyecto.tareas?.length || 0;
      const tareasCompletadas = proyecto.tareas?.filter(t => t.estado === 'Completada').length || 0;
      const porcentajeProgreso = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

      return {
        ...proyecto,
        porcentajeProgreso,
      };
    */

    // --- MOCK TEMPORAL PARA QUE COMPILE HASTA HACER MERGE ---
    const mockProyecto = {
      id,
      nombre: 'Proyecto de Prueba',
      fechaInicio: new Date(),
      departamento: { id: 1, nombre: 'Desarrollo' },
      tareas: [
        { id: 1, descripcion: 'Diseño DB', estado: 'Completada', empleado: { nombre: 'Juan' } },
        { id: 2, descripcion: 'API REST', estado: 'En Progreso', empleado: { nombre: 'Jhonatan' } }
      ]
    };

    const totalTareas = mockProyecto.tareas.length;
    const tareasCompletadas = mockProyecto.tareas.filter(t => t.estado === 'Completada').length;
    const porcentajeProgreso = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

    return {
      ...mockProyecto,
      porcentajeProgreso,
    };
  }
}
