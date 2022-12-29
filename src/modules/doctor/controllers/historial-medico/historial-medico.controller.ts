import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CitaMedica } from 'src/model/CitaMedica';
import { DoctorEspecificoGuard } from 'src/modules/guards/doctor-especifico.guard';
import { GlobalDoctorGuard } from 'src/modules/guards/global-doctor.guard';
import { HistorialMedicoService } from '../../services/historial-medico/historial-medico.service';

@ApiTags("Historial Medico")
@Controller('doctor/historial-medico')
export class HistorialMedicoController {
    constructor(
        private historialService: HistorialMedicoService
    ){}

    @ApiHeader({
        name: 'Lectura del historial médico de un paciente',
        description: 'Metodo GET para la lectura del historial médico',
      })
    @ApiOperation({ summary: 'Lectura del historial médico de un paciente'})
    @UseGuards(DoctorEspecificoGuard)
    @Get()
    async getHistorial(@Query('emailDoctor') emailDoctor: string): Promise<CitaMedica[]>{
        return this.historialService.getHistorial(emailDoctor);
    }

    @ApiHeader({
        name: 'Actualización de una cita médica',
        description: 'Metodo GET para la lectura de una cita médica por parte del doctor',
      })
    @ApiOperation({ summary: 'Actualización de una cita médica'})
    @UseGuards(DoctorEspecificoGuard)
    @Put('/:id')
    updateCita(@Param('id') idCita: number, @Body() cita: CitaMedica){
        return this.historialService.updateCita(idCita, cita);
    }

    @ApiHeader({
        name: 'Borrado de una cita médica',
        description: 'Metodo DELETE para la eliminación de una cita médica por parte del doctor',
      })
    @ApiOperation({ summary: 'Actualización del historial médico'})
    @UseGuards(DoctorEspecificoGuard)
    @Delete('/:id')
    cancelarCita(@Param('id') id: number, @Query('emailDoctor') emailDoctor: string){
        return this.historialService.cancelarCita(id);
    }

}
function DoctorGlobalGuard(DoctorGlobalGuard: any) {
    throw new Error('Function not implemented.');
}

