import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsCardComponent } from './store-details-card.component';

describe('StoreDetailsCardComponent', () => {
  let component: StoreDetailsCardComponent;
  let fixture: ComponentFixture<StoreDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
