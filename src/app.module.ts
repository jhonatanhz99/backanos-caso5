import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvancesModule } from './proyectos/avances/avances.module';

@Module({
  imports: [AvancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
