import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownHeadingComponent } from './dropdown-heading.component';

describe('DropdownHeadingComponent', () => {
  let component: DropdownHeadingComponent;
  let fixture: ComponentFixture<DropdownHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
