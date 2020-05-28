import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneladministracionComponent } from './paneladministracion.component';

describe('PaneladministracionComponent', () => {
  let component: PaneladministracionComponent;
  let fixture: ComponentFixture<PaneladministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneladministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneladministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
