import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Department } from './department.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ type: 'date' })
  fechaInicio!: string;

  @Column()
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.projects, {
    nullable: false,
  })
  @JoinColumn({ name: 'departmentId' })
  department!: Department;
}