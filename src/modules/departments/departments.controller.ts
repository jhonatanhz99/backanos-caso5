import { Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../entities/department.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  @Post('seed')
  async seed() {
    const exists = await this.departmentRepository.findOne({
      where: { id: 1 },
    });

    if (exists) {
      return exists;
    }

    const department = this.departmentRepository.create({
      nombre: 'Tecnología',
    });

    return await this.departmentRepository.save(department);
  }
}