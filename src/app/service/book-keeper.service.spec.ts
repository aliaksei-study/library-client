import { TestBed } from '@angular/core/testing';

import { BookKeeperService } from './book-keeper.service';

describe('BookKeeperService', () => {
  let service: BookKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
