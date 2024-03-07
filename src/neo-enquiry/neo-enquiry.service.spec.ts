import { Test, TestingModule } from '@nestjs/testing';
import { NeoEnquiryService } from './neo-enquiry.service';

describe('NeoEnquiryService', () => {
  let service: NeoEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeoEnquiryService],
    }).compile();

    service = module.get<NeoEnquiryService>(NeoEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
