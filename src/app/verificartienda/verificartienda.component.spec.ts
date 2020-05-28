import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificartiendaComponent } from './verificartienda.component';

describe('VerificartiendaComponent', () => {
  let component: VerificartiendaComponent;
  let fixture: ComponentFixture<VerificartiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificartiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificartiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
