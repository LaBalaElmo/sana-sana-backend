import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Alergia } from 'src/model/Alergia';
import { SuperUserGuard } from 'src/modules/guards/super-user.guard';
import { AlergiaService } from '../services/alergia.service';

@ApiTags('Alergia')
@Controller('alergia')
export class AlergiaController {
    constructor(
        private alergiaService: AlergiaService
    ){}

    @ApiHeader({
        name: 'Creacion de Alergia',
        description: 'Metodo POST para la creacion de una Alergia',
      })
    @ApiOperation({ summary: 'Creación de Alergia'})
    @UseGuards(SuperUserGuard)
    @Post()
    async createAlergia(@Body() alergia: Alergia): Promise<{mensaje:string}>{
        return this.alergiaService.createAlergia(alergia);
    }

    @ApiHeader({
        name: 'Borrar una Alergia',
        description: 'Metodo DELETE para la eliminación de una Alergia',
      })
    @ApiOperation({ summary: 'Borrar una Alergia'})
    @UseGuards(SuperUserGuard)
    @Delete()
    async deleteAlergia(@Query('idAlergia') idAlergia: number): Promise<{mensaje:string}>{
        return this.alergiaService.deleteAlergia(idAlergia);
    }

    @ApiHeader({
        name: 'Listado de Alergias',
        description: 'Metodo GET para el listado de las Alergias',
      })
    @ApiOperation({ summary: 'Listado de Alergias'})
    @Get()
    async buscarAlergias(@Query('word') word: string): Promise<Alergia[]>{
        return this.alergiaService.buscarAlergias(word);
    }

    @ApiHeader({
        name: 'Actualización de Alergia',
        description: 'Metodo PUT para la actualización de una Alergia',
      })
    @UseGuards(SuperUserGuard)
    @ApiOperation({ summary: 'Actualizacion de una Alergia'})
    @Put('/:id')
    async updateAlergia(@Param('id') idAlergia: number, @Body() alergia: Alergia){
        return this.alergiaService.updateAlergia(idAlergia, alergia);
    }
}
