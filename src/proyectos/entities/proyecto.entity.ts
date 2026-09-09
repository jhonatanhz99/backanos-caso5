import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Task, TaskStatus } from './task.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'departamento_id' })
  departamentoId: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departamento_id' })
  departamento: Department;

  @OneToMany(() => Task, (task) => task.proyecto, { cascade: true })
  tareas: Task[];

  /** Porcentaje de avance: tareas completadas / total de tareas (0–100).
   *  Requiere que la relación `tareas` esté cargada (eager o with relations).
   *  Retorna null si aún no se han cargado las tareas. */
  get porcentajeAvance(): number | null {
    if (!this.tareas) return null;
    if (this.tareas.length === 0) return 0;
    const completadas = this.tareas.filter(
      (t) => t.estado === TaskStatus.COMPLETADA,
    ).length;
    return Math.round((completadas / this.tareas.length) * 100);
  }
}
