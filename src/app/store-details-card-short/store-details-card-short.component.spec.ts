import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsCardShortComponent } from './store-details-card-short.component';

describe('StoreDetailsCardShortComponent', () => {
  let component: StoreDetailsCardShortComponent;
  let fixture: ComponentFixture<StoreDetailsCardShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailsCardShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailsCardShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
