import { Test, TestingModule } from '@nestjs/testing';
import { CorporateEnquiryService } from './corporate-enquiry.service';

describe('CorporateEnquiryService', () => {
  let service: CorporateEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporateEnquiryService],
    }).compile();

    service = module.get<CorporateEnquiryService>(CorporateEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
