import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretDownComponent } from './caret-down.component';

describe('CaretDownComponent', () => {
  let component: CaretDownComponent;
  let fixture: ComponentFixture<CaretDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaretDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
