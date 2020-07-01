import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatiendasComponent } from './listatiendas.component';

describe('ListatiendasComponent', () => {
  let component: ListatiendasComponent;
  let fixture: ComponentFixture<ListatiendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListatiendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
