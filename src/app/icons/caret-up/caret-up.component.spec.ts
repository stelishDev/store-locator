import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretUpComponent } from './caret-up.component';

describe('CaretUpComponent', () => {
  let component: CaretUpComponent;
  let fixture: ComponentFixture<CaretUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaretUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
