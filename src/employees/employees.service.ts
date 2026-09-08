import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const department = await this.departmentsRepository.findOneBy({
      id: createEmployeeDto.departamentoId,
    });

    if (!department) {
      throw new NotFoundException(
        `Department with id ${createEmployeeDto.departamentoId} not found`,
      );
    }

    const existing = await this.employeesRepository.findOneBy({
      correo: createEmployeeDto.correo,
    });

    if (existing) {
      throw new ConflictException(
        `Employee with correo "${createEmployeeDto.correo}" already exists`,
      );
    }

    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({
      relations: ['departamento'],
    });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);

    if (updateEmployeeDto.departamentoId !== undefined) {
      const department = await this.departmentsRepository.findOneBy({
        id: updateEmployeeDto.departamentoId,
      });

      if (!department) {
        throw new NotFoundException(
          `Department with id ${updateEmployeeDto.departamentoId} not found`,
        );
      }
    }

    if (updateEmployeeDto.correo !== undefined) {
      const existing = await this.employeesRepository.findOneBy({
        correo: updateEmployeeDto.correo,
      });

      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Employee with correo "${updateEmployeeDto.correo}" already exists`,
        );
      }
    }

    Object.assign(employee, updateEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
  }
}
