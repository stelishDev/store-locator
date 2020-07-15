import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { StoresListStore } from '../stores/StoresListStore';
import { StoreDetails, StoreRegion } from '../types/StoreDetails';
import { Subscription } from 'rxjs';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  private storesListStoreSubcription:Subscription;

  public stores:StoreDetails[] = [];

  public _stores:StoreDetails[] = [];

  public _region:StoreDetails;

  private region: string;

  private store: StoreDetails;

  public tabIndex:number = 1;

  // TODO: replace this with a BFF observable
  storeFilters: string[];

  constructor(private storesListStore: StoresListStore) {
    this.storesListStoreSubcription = storesListStore
    .getStores()
    .subscribe(
      (stores: StoreDetails[]) => {
        if (stores && stores.length) {
          this.stores = stores;
          this._stores = stores;
        }
    });
  }

  ngOnInit() {}

  // cleanup
  ngOnDestroy() {
    if(this.storesListStoreSubcription) {
      this.storesListStoreSubcription.unsubscribe();
    }
  }

  get storeRegions() {
    return this.stores.reduce((newStoresList, current) => {
      if (!newStoresList.some(region => region.Name == current.Region.Name)) {
          newStoresList.push(current.Region);
      }
      return newStoresList;
    }, []);
  }

  get storesFromRegion(): StoreDetails[] {
    if (!this.region) {
      return [];
    }
    let stores = this.stores.filter(store => {
      return this.region === store.Region.Name;
    });

    // filter
    if(this.storeFilters && this.storeFilters.length) {
      stores = stores.filter( store => {

        // check for 'StoreHasPharmacy'
        if (this.storeFilters.some(filter => filter === 'StoreHasPharmacy')) {
          return store.StoreHasPharmacy;
        }

        // check for 'StoreHasPharmacy'
        if (this.storeFilters.some(filter => filter === 'IsDryStore')) {
          return !store.IsDryStore;
        }

      });
    }

    return stores;
  }

  get storeRegion(): StoreDetails | null {
    let region;
    if (this.region) {
      this.storeRegions.forEach( r => {
        if (r.Name === this.region) {
          region = r;
        }
      });
    }
    return region;
  }

  get currentStoreDetails(): StoreDetails | null {
    return this.store;
  }

  public onRegionChange(region: string): void {
    // clear store
    this.store = null;
    if (region) {
      this.region = region;

      // update stores for components
      this._stores = this.storesFromRegion;
      this._region = this.storeRegion;
    }
  }

  public onStoreChange(store: string): void {
    if (store) {
      const stores: StoreDetails[] = this.stores.filter(s => s.Name === store);
      if(stores.length) {
        // set map
        this.store = stores[0];
        this._region = null;
        this._stores = stores;
        this.map.openInfo(null, this.store);
      }
    }
  }

  private filterStores(filter: string[]): void {
    console.log('filters', filter);
    this.storeFilters = filter;
    this._stores = this.storesFromRegion;
  }
}
