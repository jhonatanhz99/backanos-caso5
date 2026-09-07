import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ name: 'departamento_id' })
  departamentoId: number;
}
