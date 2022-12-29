import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Doctor } from 'src/model/Doctor';
import { SuperUserGuard } from 'src/modules/guards/super-user.guard';
import { HomeService } from '../../services/home/home.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Registrar Doctor")
@Controller('doctor')
export class RegistrarController {
    constructor(
        private homeService: HomeService
    ){}
    
    
    @ApiHeader({
        name: 'Registro de un doctor',
        description: 'Metodo POST para creacion de un doctor',
      })
    @ApiOperation({ summary: 'Creacion de un doctor'})
    @UseGuards(SuperUserGuard)
    @Post('registrar')
    async registrar(@Body() doctor: Doctor){
        return this.homeService.register(doctor);
    }
}
