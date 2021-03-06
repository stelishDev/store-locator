import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreDetails } from '../types/StoreDetails';
import { StoresApiService } from '../services/StoresApiService';

@Injectable({ providedIn: 'root' })
export class StoresListStore {
    private subject = new Subject<any>();

    constructor(private apiService: StoresApiService) {

      this.apiService
      .getParsedStores().subscribe(
        (res: StoreDetails[])=>{
        if (res) {
          const stores = res;
          this.updateStore(stores);
        }
      });
    }

    // mutations
    public updateStore(storeData: any) {
      this.subject.next(storeData);
    }

    public purgeStore() {
      this.subject.next({});
    }

    public getStores(): Observable<any> {
      return this.subject.asObservable();
    }
}
