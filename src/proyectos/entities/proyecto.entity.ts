import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

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
}
