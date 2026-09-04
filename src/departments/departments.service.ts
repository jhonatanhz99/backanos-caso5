import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './department.interface';

@Injectable()
export class DepartmentsService {
  private readonly departments: Department[] = [];
  private nextId = 1;

  findAll(): Department[] {
    return this.departments;
  }

  findOne(id: number): Department {
    const department = this.departments.find(
      (currentDepartment) => currentDepartment.id === id,
    );

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return department;
  }

  create(createDepartmentDto: CreateDepartmentDto): Department {
    const name = this.normalizeName(createDepartmentDto.name);
    this.ensureNameIsAvailable(name);

    const department: Department = { id: this.nextId++, name };
    this.departments.push(department);
    return department;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto): Department {
    const department = this.findOne(id);
    const name = this.normalizeName(updateDepartmentDto.name);
    this.ensureNameIsAvailable(name, id);

    department.name = name;
    return department;
  }

  remove(id: number): void {
    const departmentIndex = this.departments.findIndex(
      (currentDepartment) => currentDepartment.id === id,
    );

    if (departmentIndex === -1) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    this.departments.splice(departmentIndex, 1);
  }

  private normalizeName(name: string): string {
    if (typeof name !== 'string' || !name.trim()) {
      throw new BadRequestException('Department name is required');
    }

    return name.trim();
  }

  private ensureNameIsAvailable(name: string, ignoredId?: number): void {
    const alreadyExists = this.departments.some(
      (department) =>
        department.id !== ignoredId &&
        department.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );

    if (alreadyExists) {
      throw new ConflictException(`Department "${name}" already exists`);
    }
  }
}
