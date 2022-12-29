import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paciente } from 'src/model/Paciente';
import { HomeService } from '../../services/home/home.service';

@ApiTags('Registro Paciente')
@Controller('paciente')
export class RegistrarController {
  constructor(private homeService: HomeService) {}

  @ApiHeader({
    name: 'Registro paciente',
    description: 'Metodo POST para la creación del perfil de un paciente',
  })
  @ApiOperation({ summary: 'Borrado del perfil' })
  @Post('registrar')
  async registrar(@Body() paciente: Paciente) {
    return await this.homeService.register(paciente);
  }
}
