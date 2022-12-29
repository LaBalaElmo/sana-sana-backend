import { Body, Controller, Get, Query } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { HomeService } from '../../services/home/home.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Login Doctor")
@Controller('doctor')
export class LoginController {
    constructor(
        private homeService: HomeService
    ){}

    
    @ApiHeader({
        name: 'Login para los doctores',
        description: 'Metodo GET para la lectura de los doctores',
      })
    @ApiOperation({ summary: 'Lectura de los doctores para realizar el login'})
    @Get('/login')
    login(@Query('emailDoctor') email: string, @Query('password') password: string){
        return this.homeService.login(email, password);
    }
}
