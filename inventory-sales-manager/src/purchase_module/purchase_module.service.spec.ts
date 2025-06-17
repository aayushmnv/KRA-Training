import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseModuleService } from './purchase_module.service';

describe('PurchaseModuleService', () => {
  let service: PurchaseModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseModuleService],
    }).compile();

    service = module.get<PurchaseModuleService>(PurchaseModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
