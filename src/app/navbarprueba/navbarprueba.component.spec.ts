import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarpruebaComponent } from './navbarprueba.component';

describe('NavbarpruebaComponent', () => {
  let component: NavbarpruebaComponent;
  let fixture: ComponentFixture<NavbarpruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarpruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarpruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
