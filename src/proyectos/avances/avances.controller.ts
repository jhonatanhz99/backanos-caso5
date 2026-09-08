import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AvancesService } from './avances.service';

@Controller('proyectos')
export class AvancesController {
  constructor(private readonly avancesService: AvancesService) {}

  @Get(':id/detalle-avance')
  getProyectoDetalle(@Param('id', ParseIntPipe) id: number) {
    return this.avancesService.getProyectoConAvance(id);
  }
}
