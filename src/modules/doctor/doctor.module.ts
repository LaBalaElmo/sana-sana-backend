import { Module } from '@nestjs/common';
import { PerfilService } from './services/perfil/perfil.service';
import { HomeService } from './services/home/home.service';
import { HistorialMedicoService } from './services/historial-medico/historial-medico.service';
import { LoginController } from './controllers/login/login.controller';
import { PerfilController } from './controllers/perfil/perfil.controller';
import { HistorialMedicoController } from './controllers/historial-medico/historial-medico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/model/Doctor';
import { DoctorEspecialidad } from 'src/model/DoctorEspecialidad';
import { Documento } from 'src/model/Documento';
import { CitaMedica } from 'src/model/CitaMedica';
import { RegistrarController } from './controllers/registrar/registrar.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doctor,
      DoctorEspecialidad,
      Documento,
      CitaMedica
    ])
  ],
  providers: [PerfilService, HomeService, HistorialMedicoService],
  controllers: [LoginController, PerfilController, HistorialMedicoController, RegistrarController]
})
export class DoctorModule {}
