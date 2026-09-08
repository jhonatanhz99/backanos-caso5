import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  titulo?: string;
  descripcion?: string;
  estado?: TaskStatus;
  proyectoId?: number;
  empleadoId?: number;
}
