import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
