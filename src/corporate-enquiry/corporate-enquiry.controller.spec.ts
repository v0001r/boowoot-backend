import { Test, TestingModule } from '@nestjs/testing';
import { CorporateEnquiryController } from './corporate-enquiry.controller';
import { CorporateEnquiryService } from './corporate-enquiry.service';

describe('CorporateEnquiryController', () => {
  let controller: CorporateEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporateEnquiryController],
      providers: [CorporateEnquiryService],
    }).compile();

    controller = module.get<CorporateEnquiryController>(CorporateEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
