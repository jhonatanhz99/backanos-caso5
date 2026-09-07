import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
=======
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { Department } from './entities/department.entity';

import { ProjectsModule } from './modules/projects/projects.module';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Project, Department],
      synchronize: true,
    }),

    ProjectsModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
>>>>>>> d1a6f28 (Proyecto API Punto 4 - Norman Junior Bravo)
