import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirReciboComponent } from './imprimir-recibo.component';

describe('ImprimirReciboComponent', () => {
  let component: ImprimirReciboComponent;
  let fixture: ComponentFixture<ImprimirReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
