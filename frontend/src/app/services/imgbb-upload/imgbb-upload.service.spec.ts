import { TestBed } from '@angular/core/testing';

import { ImgbbUploadService } from './imgbb-upload.service';

describe('ImgbbUploadService', () => {
  let service: ImgbbUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgbbUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
