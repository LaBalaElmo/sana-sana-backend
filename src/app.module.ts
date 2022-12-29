import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { GoogleStrategy } from './auth/google.strategy';
import { GoogleController } from './auth/google/google.controller';
import { PacienteModule } from './modules/paciente/paciente.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AlergiaModule } from './modules/alergia/alergia.module';
import { EspecialidadModule } from './modules/especialidad/especialidad.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',//'Solomeo11',
      database: 'sana-sana',//'sana-sana',
      schema: 'public',
      synchronize: true,
      entities: [__dirname + '/model/**/*{.ts,.js}'],
      autoLoadEntities: true,
    }),
    TestModule,
    PacienteModule,
    DoctorModule,
    AlergiaModule,
    EspecialidadModule,
  ],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
