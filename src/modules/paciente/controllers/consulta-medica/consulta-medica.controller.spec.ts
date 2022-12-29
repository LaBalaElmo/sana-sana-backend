import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaMedicaController } from './consulta-medica.controller';

describe('ConsultaMedicaController', () => {
  let controller: ConsultaMedicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultaMedicaController],
    }).compile();

    controller = module.get<ConsultaMedicaController>(ConsultaMedicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
