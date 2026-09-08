import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  cargo: string;

  @Column({ name: 'departamento_id' })
  departamentoId: number;

  @ManyToOne(() => Department, (department) => department.empleados)
  @JoinColumn({ name: 'departamento_id' })
  departamento: Department;
}
