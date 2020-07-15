import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsListComponent } from './store-details-list.component';

describe('StoreDetailsListComponent', () => {
  let component: StoreDetailsListComponent;
  let fixture: ComponentFixture<StoreDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
