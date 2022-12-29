import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/model/Usuario';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([
            Usuario
        ])
    ],
      controllers: [TestController],
      providers: [TestService]
})
export class TestModule {}
