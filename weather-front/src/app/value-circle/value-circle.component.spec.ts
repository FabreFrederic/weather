import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCircleComponent } from './value-circle.component';

describe('ValueCircleComponent', () => {
  let component: ValueCircleComponent;
  let fixture: ComponentFixture<ValueCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
