import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleproductComponent } from './detalleproduct.component';

describe('DetalleproductComponent', () => {
  let component: DetalleproductComponent;
  let fixture: ComponentFixture<DetalleproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
