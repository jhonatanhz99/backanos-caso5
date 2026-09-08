import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Employee } from '../../employees/entities/employee.entity';

export enum TaskStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA = 'COMPLETADA',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDIENTE,
  })
  estado: TaskStatus;

  @Column({ name: 'proyecto_id' })
  proyectoId: number;

  @Column({ name: 'empleado_id' })
  empleadoId: number;

  @ManyToOne(() => Proyecto)
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Employee;
}
