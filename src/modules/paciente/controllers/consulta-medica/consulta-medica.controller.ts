import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CitaMedica } from 'src/model/CitaMedica';
import { GlobalDoctorGuard } from 'src/modules/guards/global-doctor.guard';
import { GlobalPacienteGuard } from 'src/modules/guards/global-paciente.guard';
import { PacienteDoctorGuard } from 'src/modules/guards/paciente-doctor-guard.guard';
import { PacienteEspecificoGuard } from 'src/modules/guards/paciente-especifico.guard';
import { ConsultaMedicaService } from '../../services/consulta-medica/consulta-medica.service';

@ApiTags('Consulta Médica')
@Controller('paciente/consulta-medica')
export class ConsultaMedicaController {
  constructor(private consultaService: ConsultaMedicaService) {}

  @ApiHeader({
    name: 'Crear cita médica',
    description:
      'Metodo POST para la creación de una cita médica por parte del paciente',
  })
  @ApiOperation({ summary: 'Crear cita médica' })
  @UseGuards(GlobalPacienteGuard)
  @Post()
  hacerCita(@Body() citaMedica: CitaMedica) {
    console.log(citaMedica);
    return this.consultaService.hacerCita(citaMedica);
  }

  @ApiHeader({
    name: 'Lectura del historial médico',
    description: 'Metodo GET para la obtención del historial médico propio',
  })
  @ApiOperation({ summary: 'Lectura del historial médico' })
  // @UseGuards(PacienteEspecificoGuard)
  @Get()
  getHistorialPaciente(@Query('emailPaciente') emailPaciente: string) {
    return this.consultaService.getHistorialPaciente(emailPaciente);
  }

  @ApiHeader({
    name: 'Eliminación de una cita médica',
    description:
      'Metodo DELETE para la eliminación de una cita médica por parte del paciente',
  })
  @ApiOperation({ summary: 'Eliminación de una cita médica' })
  // @UseGuards(PacienteDoctorGuard)
  @Delete('/:id')
  cancelarCita(
    @Param('id') id: number, @Query('emailPaciente') emailPaciente:string) {
    return this.consultaService.cancelarCita(id);
  }
}
