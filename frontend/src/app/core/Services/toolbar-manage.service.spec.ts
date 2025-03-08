import { TestBed } from '@angular/core/testing';

import { ToolbarManageService } from './toolbar-manage.service';

describe('ToolbarManageService', () => {
  let service: ToolbarManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
