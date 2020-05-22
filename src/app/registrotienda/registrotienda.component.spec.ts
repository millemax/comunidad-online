import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotiendaComponent } from './registrotienda.component';

describe('RegistrotiendaComponent', () => {
  let component: RegistrotiendaComponent;
  let fixture: ComponentFixture<RegistrotiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrotiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrotiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
