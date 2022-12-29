import { Test, TestingModule } from '@nestjs/testing';
import { AlergiaController } from './alergia.controller';

describe('AlergiaController', () => {
  let controller: AlergiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlergiaController],
    }).compile();

    controller = module.get<AlergiaController>(AlergiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
