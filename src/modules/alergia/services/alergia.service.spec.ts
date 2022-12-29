import { Test, TestingModule } from '@nestjs/testing';
import { AlergiaService } from './alergia.service';

describe('AlergiaService', () => {
  let service: AlergiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlergiaService],
    }).compile();

    service = module.get<AlergiaService>(AlergiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
