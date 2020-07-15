import { Component, OnInit, Input } from '@angular/core';
import { StoreDataUtilsService } from '../../services/store-data-utils.service';
import { StoreDetails } from '../../types/StoreDetails';

@Component({
  selector: 'app-store-details-card',
  templateUrl: './store-details-card.component.html',
  styleUrls: ['./store-details-card.component.scss']
})
export class StoreDetailsCardComponent implements OnInit {

  @Input()
  public store: StoreDetails;

  public storeDataUtilsService: StoreDataUtilsService = new StoreDataUtilsService();

  public storeHours: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.store) {
      this.storeHours = this.storeDataUtilsService
        .extractOpenHours(this.store.OpeningHours);
    }
  }

  toggleStoreOpening(store: StoreDetails): void {
    if (!store.hasOwnProperty('showStoreOpeningTimes')) {
      store['showStoreOpeningTimes'] = true;
    } else {
      store['showStoreOpeningTimes'] = !store['showStoreOpeningTimes'];
    }
  }

  togglePharmacyDetails(store: StoreDetails): void {
    if (!store.hasOwnProperty('showPharmacyDetails')) {
      store['showPharmacyDetails'] = true;
    } else {
      store['showPharmacyDetails'] = !store['showPharmacyDetails'];
    }
  }

  launchMapDirections(): void {
    window.open(`https://www.google.com/maps/dir/?api=1&query=${this.store.Latitude}, ${this.store.Longitude}
    &destination=Countdown+${this.store.Name}&travelmode=driving`, '_blank');
  }

}
