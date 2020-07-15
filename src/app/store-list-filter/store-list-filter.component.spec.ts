import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListFilterComponent } from './store-list-filter.component';

describe('StoreListFilterComponent', () => {
  let component: StoreListFilterComponent;
  let fixture: ComponentFixture<StoreListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
