import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsCardComponent } from './store-details-card.component';
import { ParsedStoreDetails } from '../../types/StoreDetails';
import { PhoneComponent } from '../icons/phone/phone.component';
import { CarComponent } from '../icons/car/car.component';
import { CaretDownComponent } from '../icons/caret-down/caret-down.component';
import { CaretUpComponent } from '../icons/caret-up/caret-up.component';

describe('StoreDetailsCardComponent', () => {
  let component: StoreDetailsCardComponent;
  let fixture: ComponentFixture<StoreDetailsCardComponent>;

  const storeData: ParsedStoreDetails = {
    Name: 'Test store',
    Address: '123 Test St, Test Suburb, Test Land',
    IsDryStore: false,
    PharmacyOpeningHours: [],
    Latitude: '-37.6757',
    Longitude: '176.2241'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreDetailsCardComponent,
        PhoneComponent,
        CarComponent,
        CaretDownComponent,
        CaretUpComponent,
      ]
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

  describe('Props: has correct props', () => {
    beforeEach(() => {
      component.store = storeData;
      fixture.detectChanges();
    });

    it(`should have be ${storeData.Name} as store.Name prop`, () => {
      expect(component.store.Name).toBe(storeData.Name);
      expect(component.store.Address).toBe(storeData.Address);
    });

    it(`should have be ${storeData.Address} as store.Address prop`, () => {
      expect(component.store.Address).toBe(storeData.Address);
    });

    it(`should have ${storeData.IsDryStore} as store.IsDryStore prop`, () => {
      expect(component.store.IsDryStore).toBe(storeData.IsDryStore);
    });

    it(`should have ${storeData.showStoreOpeningTimes} as store.showStoreOpeningTimes prop`, () => {
      expect(component.store.showStoreOpeningTimes).toBe(storeData.showStoreOpeningTimes);
    });

    it(`should have ${storeData.Latitude} as store.Latitude prop`, () => {
      expect(component.store.Latitude).toBe(storeData.Latitude);
    });

    it(`should have ${storeData.Longitude} as store.Longitude prop`, () => {
      expect(component.store.Longitude).toBe(storeData.Longitude);
    });
  });

  describe('Method: toggleStoreOpening:', () => {
    beforeEach(() => {
      component.store = storeData;
      fixture.detectChanges();
    });
    it('should set add showStoreOpeningTimes prop to store object is doesnt exist', () => {
      component.toggleStoreOpening(storeData);
      expect(component.store.showStoreOpeningTimes).toBe(true);
    });

    it('should set showStoreOpeningTimes prop to true if false', () => {
      storeData.showStoreOpeningTimes = false;
      component.toggleStoreOpening(storeData);
      expect(component.store.showStoreOpeningTimes).toBe(true);
    });

    it('should set showStoreOpeningTimes prop to false if true', () => {
      storeData.showStoreOpeningTimes = true;
      component.toggleStoreOpening(storeData);
      expect(component.store.showStoreOpeningTimes).toBe(false);
    });
  });

  describe('Method: togglePharmacyDetails:', () => {
    beforeEach(() => {
      component.store = storeData;
      fixture.detectChanges();
    });
    it('should set add showPharmacyDetails prop to store object is doesnt exist', () => {
      component.togglePharmacyDetails(storeData);
      expect(component.store.showPharmacyDetails).toBe(true);
    });

    it('should set showPharmacyDetails prop to true if false', () => {
      storeData.showPharmacyDetails = false;
      component.togglePharmacyDetails(storeData);
      expect(component.store.showPharmacyDetails).toBe(true);
    });

    it('should set showPharmacyDetails prop to false if true', () => {
      storeData.showPharmacyDetails = true;
      component.togglePharmacyDetails(storeData);
      expect(component.store.showPharmacyDetails).toBe(false);
    });
  });

  describe('Method: launchMapDirections:', () => {
    beforeEach(() => {
      component.store = storeData;
      fixture.detectChanges();
    });
    it('should call window.open when correct props exist', () => {
      const windowOpenSpy = spyOn(window, 'open');
      component.launchMapDirections();
      expect(windowOpenSpy).toHaveBeenCalledWith(
        `${component.googleBaseDirectionsApi}${component.store.Latitude}, ${component.store.Longitude}
        &destination=Countdown+${component.store.Name}&travelmode=driving`, '_blank'
      );
    });

    it('should NOT call window.open if store.Latitude does not exist', () => {
      const windowOpenSpy = spyOn(window, 'open');
      component.store.Latitude = '';
      component.launchMapDirections();
      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    it('should NOT call window.open if store.Longitude does not exist', () => {
      const windowOpenSpy = spyOn(window, 'open');
      component.store.Longitude = '';
      component.launchMapDirections();
      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    it('should NOT call window.open if store.Name does not exist', () => {
      const windowOpenSpy = spyOn(window, 'open');
      component.store.Name = '';
      component.launchMapDirections();
      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

  });

  describe('Method: callStore:', () => {
    beforeEach(() => {
      component.store = storeData;
      fixture.detectChanges();
    });

    it('should set window.location.href to tel:099991234 when store.ContactDetails.phone is (09) 999 1234', () => {
      component.store.ContactDetails.phone = '(09) 999 1234';
      const windowHref = spyOn(window.location, 'href');
      component.callStore();
      expect(windowHref).toHaveBeenCalledWith('099991234');
    });
  });
});
