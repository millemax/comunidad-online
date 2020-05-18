import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalg1Component } from './modalg1.component';

describe('Modalg1Component', () => {
  let component: Modalg1Component;
  let fixture: ComponentFixture<Modalg1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modalg1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modalg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
