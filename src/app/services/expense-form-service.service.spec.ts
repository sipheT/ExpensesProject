import { TestBed } from '@angular/core/testing';

import { ExpenseFormService } from './expense-form-service.service';

describe('ExpenseFormServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseFormService = TestBed.get(ExpenseFormService);
    expect(service).toBeTruthy();
  });
});
