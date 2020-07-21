import { Component, OnInit, Input } from '@angular/core';
import { StoreDataUtilsService } from '../../services/store-data-utils.service';
import { ParsedStoreDetails } from '../../types/StoreDetails';

@Component({
  selector: 'app-store-details-card',
  templateUrl: './store-details-card.component.html',
  styleUrls: ['./store-details-card.component.scss']
})
export class StoreDetailsCardComponent implements OnInit {

  @Input()
  public store: ParsedStoreDetails;

  public storeDataUtilsService: StoreDataUtilsService = new StoreDataUtilsService();

  googleBaseDirectionsApi: string = 'https://www.google.com/maps/dir/?api=1&query=';

  constructor() { }

  ngOnInit(): void {
    //
  }

  toggleStoreOpening(store: ParsedStoreDetails): void {
    if (!store.hasOwnProperty('showStoreOpeningTimes')) {
      store['showStoreOpeningTimes'] = true;
    } else {
      store['showStoreOpeningTimes'] = !store['showStoreOpeningTimes'];
    }
  }

  togglePharmacyDetails(store: ParsedStoreDetails): void {
    if (!store.hasOwnProperty('showPharmacyDetails')) {
      store['showPharmacyDetails'] = true;
    } else {
      store['showPharmacyDetails'] = !store['showPharmacyDetails'];
    }
  }

  launchMapDirections(): void {
    if (this.store.Latitude && this.store.Longitude && this.store.Name) {
      window.open(`${this.googleBaseDirectionsApi}${this.store.Latitude}, ${this.store.Longitude}
        &destination=Countdown+${this.store.Name}&travelmode=driving`, '_blank');
    }
  }

  callStore(): void {
    if (this.store && this.store.ContactDetails.phone) {
      // strip parenthesis and whitespaces
      const cleannum = this.store.ContactDetails.phone.replace(/[() ]/g, '');
      window.location.href = `tel:${cleannum}`;
    }
  }

}
