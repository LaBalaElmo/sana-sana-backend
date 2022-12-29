import { Query, Body, Controller, Get, Param } from '@nestjs/common';
import { Paciente } from 'src/model/Paciente';
import { HomeService } from '../../services/home/home.service';
import { LoginDto } from 'src/dto/login.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Login paciente')
@Controller('paciente')
export class LoginController {
  constructor(private homeService: HomeService) {}

  @ApiHeader({
    name: 'Login paciente',
    description: 'Metodo GEt para el login del paciente',
  })
  @ApiOperation({ summary: 'Login paciente' })
  @Get('login')
  async login(
    @Query('emailPaciente') email: string,
    @Query('password') password: string,
  ): Promise<string | Paciente> {
    return this.homeService.login(email, password);
  }
}
