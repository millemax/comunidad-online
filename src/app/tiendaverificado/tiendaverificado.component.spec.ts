import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaverificadoComponent } from './tiendaverificado.component';

describe('TiendaverificadoComponent', () => {
  let component: TiendaverificadoComponent;
  let fixture: ComponentFixture<TiendaverificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaverificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaverificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
