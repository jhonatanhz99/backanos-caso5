import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proyecto } from './proyecto.entity';

export enum TaskStatus {
  PENDIENTE = 'pendiente',
  EN_PROGRESO = 'en_progreso',
  COMPLETADA = 'completada',
}

@Entity('tareas')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDIENTE,
  })
  estado: TaskStatus;

  @Column({ name: 'proyecto_id' })
  proyectoId: number;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;
}
