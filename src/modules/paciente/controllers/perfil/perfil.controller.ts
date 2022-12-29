import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Doctor } from 'src/model/Doctor';
import { Paciente } from 'src/model/Paciente';
import { PacienteAlergia } from 'src/model/PacienteAlergia';
import { PacienteDoctorGuard } from 'src/modules/guards/paciente-doctor-guard.guard';
import { PacienteEspecificoGuard } from 'src/modules/guards/paciente-especifico.guard';
import { SuperUserGuard } from 'src/modules/guards/super-user.guard';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PerfilPService } from '../../services/perfil/perfil.service';

@ApiTags('Perfil Paciente')
@Controller('paciente/perfil')
export class PerfilController {
  constructor(private perfilService: PerfilPService) {}

  @ApiHeader({
    name: 'Obtención del perfil del paciente',
    description: 'Metodo GET para la obtención del perfil del paciente',
  })
  @ApiOperation({ summary: 'Obtención del perfil del paciente' })
  @UseGuards(PacienteDoctorGuard)
  @Get()
  async getPerfil(@Query('emailPaciente') emailPaciente: string) {
    return this.perfilService.getPerfilPaciente(emailPaciente);
  }

  @ApiHeader({
    name: 'Actualización del perfil del paciente',
    description: 'Metodo PUT para la actualización del perfil del paciente',
  })
  @ApiOperation({ summary: 'Actualización del perfil del paciente' })
  @UseGuards(PacienteEspecificoGuard)
  @Put()
  async updatePerfil(
    @Body('emailPaciente') email: string,
    @Body('paciente') paciente: QueryDeepPartialEntity<Paciente>,
  ) {
    return this.perfilService.updatePerfilPaciente(email, paciente);
  }

  @ApiHeader({
    name: 'Obtención de las alergias',
    description: 'Metodo GET para la obtencion de las alergias del paciente',
  })
  @ApiOperation({ summary: 'Obtención de las alergias' })
  @UseGuards(PacienteDoctorGuard)
  @Get('alergias')
  getAlergias(@Query('emailPaciente') email: string) {
    return this.perfilService.getAlergias(email);
  }

  @ApiHeader({
    name: 'Adición de las alergias',
    description: 'Metodo POST para añadir alergias al paciente',
  })
  @ApiOperation({ summary: 'Adición de las alergias' })
  @Post('alergias')
  @UseGuards(PacienteEspecificoGuard)
  postAlergias(@Body() pacienteAlergia: PacienteAlergia) {
    return this.perfilService.postAlergias(pacienteAlergia);
  }

  @ApiHeader({
    name: 'Actualización de las alergias',
    description:
      'Metodo PUT para la actualización de las alergias del paciente',
  })
  @ApiOperation({ summary: 'Actualización de las alergias' })
  @UseGuards(PacienteEspecificoGuard)
  @Put('alergias/:id')
  updateAlergias(
    @Param('id') idPacienteAlergia: number,
    @Body() pacienteAlergia: PacienteAlergia,
  ) {
    return this.perfilService.updateAlergias(
      idPacienteAlergia,
      pacienteAlergia,
    );
  }

  @ApiHeader({
    name: 'Borrado del perfil',
    description: 'Metodo DELETE para la eliminación del perfil de un paciente',
  })
  @ApiOperation({ summary: 'Borrado del perfil' })
  @UseGuards(PacienteEspecificoGuard)
  @Delete()
  deletePerfil(@Query('emailPaciente') emailPaciente: string) {
    return this.perfilService.deletePerfil(emailPaciente);
  }

  @ApiHeader({
    name: 'Borrado de alergia',
    description:
      'Metodo DELETE para la eliminación de una alergia de un paciente',
  })
  @ApiOperation({ summary: 'Borrado de alergia' })
  @UseGuards(PacienteEspecificoGuard)
  @Delete('alergias/:id')
  deleteAlergias(
    @Param('id') idAlergias: number
  ) {
    return this.perfilService.deleteAlergia(idAlergias);
  }

  @UseGuards(PacienteEspecificoGuard)
  @Put('puntuar')
  puntuarDoctor(
    @Body('rank') rank: number,
    @Body('doctor') doctor: QueryDeepPartialEntity<Doctor>
  ): Promise<string> {
    return this.perfilService.puntuarDoctor(rank, doctor);
  }

  @ApiHeader({
    name: 'Listado de Paciente',
    description: 'Metodo GET para el listado de los Pacientes',
  })
  @ApiOperation({ summary: 'Listado de Pacientes' })
  @UseGuards(SuperUserGuard)
  @Get('buscar')
  async buscarPaciente(@Query('word') word: string): Promise<Paciente[]> {
    return this.perfilService.buscarPacientes(word);
  }
}
