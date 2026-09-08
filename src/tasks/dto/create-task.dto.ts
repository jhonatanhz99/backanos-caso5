import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  titulo!: string;
  descripcion!: string;
  estado?: TaskStatus;
  proyectoId!: number;
  empleadoId!: number;
}
