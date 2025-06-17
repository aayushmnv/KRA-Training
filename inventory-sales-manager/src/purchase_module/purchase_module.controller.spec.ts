import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseModuleController } from './purchase_module.controller';

describe('PurchaseModuleController', () => {
  let controller: PurchaseModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseModuleController],
    }).compile();

    controller = module.get<PurchaseModuleController>(PurchaseModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
