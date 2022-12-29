import { Module } from '@nestjs/common';
import { AlergiaService } from './services/alergia.service';
import { AlergiaController } from './controllers/alergia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alergia } from 'src/model/Alergia';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Alergia
    ])
  ],
  providers: [AlergiaService],
  controllers: [AlergiaController]
})
export class AlergiaModule {}
