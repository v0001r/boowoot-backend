import { Test, TestingModule } from '@nestjs/testing';
import { NeoEnquiryController } from './neo-enquiry.controller';
import { NeoEnquiryService } from './neo-enquiry.service';

describe('NeoEnquiryController', () => {
  let controller: NeoEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeoEnquiryController],
      providers: [NeoEnquiryService],
    }).compile();

    controller = module.get<NeoEnquiryController>(NeoEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
