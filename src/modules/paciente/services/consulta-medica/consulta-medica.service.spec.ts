import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaMedicaService } from './consulta-medica.service';

describe('ConsultaMedicaService', () => {
  let service: ConsultaMedicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultaMedicaService],
    }).compile();

    service = module.get<ConsultaMedicaService>(ConsultaMedicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
