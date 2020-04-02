import { TestBed } from '@angular/core/testing';

import { ExpenseTypesService } from './expense-types.service';

describe('ExpenseTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseTypesService = TestBed.get(ExpenseTypesService);
    expect(service).toBeTruthy();
  });
});
