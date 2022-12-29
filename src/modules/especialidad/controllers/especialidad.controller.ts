import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Especialidad } from 'src/model/Especialidad';
import { SuperUserGuard } from 'src/modules/guards/super-user.guard';
import { EspecialidadService } from '../services/especialidad.service';

@ApiTags("Especialidad")
@Controller('especialidad')
export class EspecialidadController {
    constructor(
        private especialidadService: EspecialidadService
    ){}

    @ApiHeader({
        name: 'Crear especialidad ',
        description: 'Metodo POST para la creación de la especialidad del Doctor',
      })
    @ApiOperation({ summary: 'Creacion de la especialidad'})
    @UseGuards(SuperUserGuard)
    @Post()
    async createEspecialidad(@Body() especialidad: Especialidad): Promise<{mensaje:string}>{
        return this.especialidadService.createEspecialidad(especialidad);
    }

    @ApiHeader({
        name: 'Borrar especialidad ',
        description: 'Metodo DELETE para borrar la especialidad del Doctor',
      })
    @ApiOperation({ summary: 'Borrado de la especialidad'})
    @UseGuards(SuperUserGuard)
    @Delete()
    async deleteEspecialidad(@Query('idEspecialidad') idEspecialidad: number): Promise<{mensaje:string}>{
        return this.especialidadService.deleteEspecialidad(idEspecialidad);
    }
    
    @ApiHeader({
        name: 'Lectura especialidad ',
        description: 'Metodo GET para la lectura de la especialidad del Doctor',
      })
    @ApiOperation({ summary: 'Lectura de la especialidad'})
    @Get()
    async buscarEspecialidad(@Query('word') word: string): Promise<Especialidad[]>{
        return this.especialidadService.buscarEspecialidad(word);
    }
    
    @ApiHeader({
        name: 'Actualizar especialidad ',
        description: 'Metodo PUT para la actualización de la especialidad del Doctor',
      })
    @ApiOperation({ summary: 'Actualizar de la especialidad'})
    @UseGuards(SuperUserGuard)
    @Put(':id')
    async updateEspecialidad(@Param('id') idEspecialidad: number, @Body() especialidad: Especialidad){
        return this.especialidadService.updateEspecialidad(idEspecialidad, especialidad);
    }
}