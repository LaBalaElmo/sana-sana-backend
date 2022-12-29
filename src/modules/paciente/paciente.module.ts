import { Module } from '@nestjs/common';
import { HomeService } from './services/home/home.service';
import { PerfilPService } from './services/perfil/perfil.service';
import { ConsultaMedicaService } from './services/consulta-medica/consulta-medica.service';
import { LoginController } from './controllers/login/login.controller';
import { RegistrarController } from './controllers/registrar/registrar.controller';
import { PerfilController } from './controllers/perfil/perfil.controller';
import { ConsultaMedicaController } from './controllers/consulta-medica/consulta-medica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'src/model/Paciente';
import { PacienteAlergia } from 'src/model/PacienteAlergia';
import { CitaMedica } from 'src/model/CitaMedica';
import { Doctor } from 'src/model/Doctor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paciente,
      PacienteAlergia,
      CitaMedica,
      Doctor
    ])
  ],  
  providers: [HomeService, PerfilPService, ConsultaMedicaService],
  controllers: [LoginController, RegistrarController, PerfilController, ConsultaMedicaController]
})
export class PacienteModule {}
