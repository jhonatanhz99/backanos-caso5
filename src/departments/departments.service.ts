import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return department;
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const nombre = this.normalizeName(createDepartmentDto.nombre);
    await this.ensureNameIsAvailable(nombre);

    const department = this.departmentRepository.create({
      nombre,
      descripcion: createDepartmentDto.descripcion,
    });
    return this.departmentRepository.save(department);
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findOne(id);

    if (updateDepartmentDto.nombre !== undefined) {
      const nombre = this.normalizeName(updateDepartmentDto.nombre);
      await this.ensureNameIsAvailable(nombre, id);
      department.nombre = nombre;
    }

    if (updateDepartmentDto.descripcion !== undefined) {
      department.descripcion = updateDepartmentDto.descripcion;
    }

    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }

  private normalizeName(name: string): string {
    if (typeof name !== 'string' || !name.trim()) {
      throw new BadRequestException('Department nombre is required');
    }

    return name.trim();
  }

  private async ensureNameIsAvailable(
    nombre: string,
    ignoredId?: number,
  ): Promise<void> {
    const departments = await this.departmentRepository.find();
    const alreadyExists = departments.some(
      (department) =>
        department.id !== ignoredId &&
        department.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase(),
    );

    if (alreadyExists) {
      throw new ConflictException(`Department "${nombre}" already exists`);
    }
  }
}
