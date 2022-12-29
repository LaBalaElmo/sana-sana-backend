import { Module } from '@nestjs/common';
import { EspecialidadService } from './services/especialidad.service';
import { EspecialidadController } from './controllers/especialidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from 'src/model/Especialidad';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Especialidad
    ])
  ],
  providers: [EspecialidadService],
  controllers: [EspecialidadController]
})
export class EspecialidadModule {}
