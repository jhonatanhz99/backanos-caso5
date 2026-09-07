import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOneBy({ id });

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
    Object.assign(employee, updateEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
  }
}
