import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSmallComponent } from './dropdown-small.component';

describe('DropdownSmallComponent', () => {
  let component: DropdownSmallComponent;
  let fixture: ComponentFixture<DropdownSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
