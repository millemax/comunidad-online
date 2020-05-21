import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarusuarioComponent } from './verificarusuario.component';

describe('VerificarusuarioComponent', () => {
  let component: VerificarusuarioComponent;
  let fixture: ComponentFixture<VerificarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
