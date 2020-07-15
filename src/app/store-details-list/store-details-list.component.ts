import { Component, OnInit, Input } from '@angular/core';
import { StoreDetails } from '../../types/StoreDetails';

@Component({
  selector: 'app-store-details-list',
  templateUrl: './store-details-list.component.html',
  styleUrls: ['./store-details-list.component.scss']
})
export class StoreDetailsListComponent implements OnInit {

  @Input()
  public stores: StoreDetails[];

  constructor() { }

  ngOnInit(): void {
  }

  toggleStoreOpening(store: StoreDetails): void {
    if(!store.hasOwnProperty('showStoreOpeningTimes')) {
      store['showStoreOpeningTimes'] = true;
    }else {
      store['showStoreOpeningTimes'] = !store['showStoreOpeningTimes'];
    }
  }
  extractPhoneNumberFromContactDetailsProp(store:StoreDetails): string {
    const num = store.ContactDetails.match(/[(]{0,1}[0-9]{1,2}[)]\s[0-9]{3}\s[0-9]{4}/g);
    return num && num.length ? num[0] : '';
  }

  replaceLineBreaksWithCommas(store:StoreDetails): string {
    return store.Address.replace(/<br \/>/g, ',&nbsp;');
  }

}
