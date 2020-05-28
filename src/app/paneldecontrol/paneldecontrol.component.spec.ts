import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneldecontrolComponent } from './paneldecontrol.component';

describe('PaneldecontrolComponent', () => {
  let component: PaneldecontrolComponent;
  let fixture: ComponentFixture<PaneldecontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneldecontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneldecontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
