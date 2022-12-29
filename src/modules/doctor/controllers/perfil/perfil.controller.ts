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
import { Doctor } from 'src/model/Doctor';
import { DoctorEspecialidad } from 'src/model/DoctorEspecialidad';
import { Documento } from 'src/model/Documento';
import { DoctorEspecificoGuard } from 'src/modules/guards/doctor-especifico.guard';
import { SuperUserGuard } from 'src/modules/guards/super-user.guard';
import { PerfilService } from '../../services/perfil/perfil.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PacienteDoctorGuard } from 'src/modules/guards/paciente-doctor-guard.guard';
import { GlobalDoctorGuard } from 'src/modules/guards/global-doctor.guard';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GlobalGuard } from 'src/modules/guards/global.guard';

@ApiTags('Perfil Doctor')
@Controller('doctor/perfil')
export class PerfilController {
  constructor(private perfilService: PerfilService) { }

  @ApiHeader({
    name: 'Lectura de perfil del doctor',
    description:
      'Metodo GET para la lectura del perfil de un doctor en especifico',
  })
  @ApiOperation({ summary: 'Lectura del perfil de un doctor en especifico' })
  @Get()
  async getPerfilDoctor(
    @Query('emailDoctor') emailDoctor: string,
  ): Promise<Doctor> {
    //console.log(await this.perfilService.getPerfilDoctor(emailDoctor))
    return this.perfilService.getPerfilDoctor(emailDoctor);
  }

  @ApiHeader({
    name: 'Actualizacion del perfil de un doctor',
    description: 'Metodo PUT para actualizar el perfil de un doctor',
  })
  @ApiOperation({ summary: 'Actualizacion del perfil de un doctor' })
  @UseGuards(GlobalGuard)
  @Put()
  async updatePerfilDoctor(
    @Body('emailDoctor') emailDoctor: string,
    @Body('doctor') doctor: QueryDeepPartialEntity<Doctor>,
  ): Promise<Doctor> {
    return this.perfilService.updatePerfilDoctor(emailDoctor, doctor);
  }

  @ApiHeader({
    name: 'Creacion del documento de un doctor',
    description: 'Metodo POST para la creacion del documento de un doctor',
  })
  @ApiOperation({ summary: 'Crear el documento de un doctor' })
  @UseGuards(DoctorEspecificoGuard)
  @Post('documento')
  async addDocumento(
    @Body('emailDoctor') emailDoctor: string,
    @Body('documento') documento: Documento,
  ): Promise<Documento[]> {
    return this.perfilService.addDocumento(emailDoctor, documento);
  }

  @ApiHeader({
    name: 'Lectura de todos los documentos de un doctor en especifico',
    description:
      'Metodo GET para leer los documentos de un doctor en especifico',
  })
  @ApiOperation({
    summary: 'Lectura del los documentos de un doctor en especifico',
  })
  @Get('documento')
  async getAllDocuments(
    @Query('emailDoctor') emailDoctor: string,
  ): Promise<Documento[]> {
    return this.perfilService.getAllDocuments(emailDoctor);
  }

  @ApiHeader({
    name: 'Lectura de un documento en especifico',
    description: 'Metodo GET para la lectura de un documento en especifico',
  })
  @ApiOperation({ summary: 'Lectura de un documento en especifico' })
  @Get('documento/:id')
  async getDocumento(@Param('id') idDocumento: number) {
    return this.perfilService.getDocument(idDocumento);
  }

  @ApiHeader({
    name: 'Creacion de la especialidad de un doctor',
    description:
      'Metodo POST para la creacion de una especialidad de un doctor',
  })
  @ApiOperation({ summary: 'Creacion de una especialidad ' })
  @UseGuards(DoctorEspecificoGuard)
  @Post('especialidad')
  async addEspecialidad(
    @Body() doctorEspecialidad: DoctorEspecialidad,
  ): Promise<Doctor> {
    return this.perfilService.addEspecialidad(doctorEspecialidad);
  }

  @ApiHeader({
    name: 'Borrar el perfil de un doctor',
    description:
      'Metodo DELETE para borrar el perfil de un doctor en especifico',
  })
  @ApiOperation({ summary: 'Borrar el perfil de un doctor en especifico' })
  //
  @UseGuards(DoctorEspecificoGuard)
  @Delete()
  async deletePerfil(@Query('emailDoctor') emailDoctor: string) {
    return this.perfilService.deletePerfil(emailDoctor);
  }

  @ApiHeader({
    name: 'Actualizar el documento de un doctor',
    description: 'Metodo PUT para actualizar el documento de un doctor',
  })
  @ApiOperation({ summary: 'Actualizacion del documento de un doctor' })
  @UseGuards(DoctorEspecificoGuard)
  @Put('documento/:id')
  async updateDocumeto(
    @Param('id') idDocumento: number,
    @Body() documento: Documento,
  ) {
    return this.perfilService.updateDocumento(idDocumento, documento);
  }

  @ApiHeader({
    name: 'Borrar el documento de un doctor',
    description: 'Metodo DELETE para borrar un documento',
  })
  @ApiOperation({ summary: 'Borrar un documento del doctor' })
  @UseGuards(DoctorEspecificoGuard)
  @Delete('documento/:id')
  async deleteDocumeto(
    @Param('id') idDocumento: number
  ) {
    return this.perfilService.deleteDocumento(idDocumento);
  }

  @ApiHeader({
    name: 'Lectura de horario del doctor',
    description:
      'Metodo GET para la lectura del horario de un doctor en especifico',
  })
  @ApiOperation({ summary: 'Lectura del horario de un doctor en especifico' })
  @Get('horario')
  async getHorarioDoctor(
    @Query('emailDoctor') emailDoctor: string,
  ): Promise<string[]> {
    // console.log(await this.perfilService.getPerfilDoctor(emailDoctor))
    return this.perfilService.getHorarios(emailDoctor);
  }

  @ApiHeader({
    name: 'Listado de Doctores',
    description: 'Metodo GET para el listado de los Doctores',
  })
  @ApiOperation({ summary: 'Listado de Doctores' })
  @Get('buscar')
  async buscarDoctores(@Query('word') word: string): Promise<Doctor[]> {
    return this.perfilService.buscarDoctores(word);
  }

  // @ApiHeader({
  //   name: 'Actualizacion del horario de un doctor',
  //   description: 'Metodo PUT para actualizar el horario de un doctor',
  // })
  // @ApiOperation({ summary: 'Actualizacion del horario de un doctor' })
  // @UseGuards(DoctorEspecificoGuard)
  // @Put('horario')
  // async updateHorarioDoctor(
  //   @Body('emailDoctor') emailDoctor: string,
  //   @Body('doctor') doctor: Doctor,
  // ): Promise<Doctor> {
  //   return this.perfilService.updatePerfilDoctor(emailDoctor, doctor);
  // }

}
