import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoverificadoComponent } from './codigoverificado.component';

describe('CodigoverificadoComponent', () => {
  let component: CodigoverificadoComponent;
  let fixture: ComponentFixture<CodigoverificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoverificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoverificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
