import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarController } from './registrar.controller';

describe('RegistrarController', () => {
  let controller: RegistrarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrarController],
    }).compile();

    controller = module.get<RegistrarController>(RegistrarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
