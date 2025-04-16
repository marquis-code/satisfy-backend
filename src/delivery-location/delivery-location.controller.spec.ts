import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryLocationController } from './delivery-location.controller';
import { DeliveryLocationService } from './delivery-location.service';

describe('DeliveryLocationController', () => {
  let controller: DeliveryLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryLocationController],
      providers: [DeliveryLocationService],
    }).compile();

    controller = module.get<DeliveryLocationController>(DeliveryLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
