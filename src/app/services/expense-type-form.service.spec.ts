import { TestBed } from '@angular/core/testing';

import { ExpenseTypeFormService } from './expense-type-form.service';

describe('ExpenseTypeFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseTypeFormService = TestBed.get(ExpenseTypeFormService);
    expect(service).toBeTruthy();
  });
});
