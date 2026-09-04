import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [DepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
