import { TestBed } from '@angular/core/testing';

import { RecetasUsuarioService } from './recetas-usuario.service';

describe('RecetasUsuarioService', () => {
  let service: RecetasUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetasUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
