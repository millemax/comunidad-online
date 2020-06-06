import { TestBed } from '@angular/core/testing';

import { RegistrotiendaService } from './registrotienda.service';

describe('RegistrotiendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrotiendaService = TestBed.get(RegistrotiendaService);
    expect(service).toBeTruthy();
  });
});
