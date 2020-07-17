import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, delay, tap, map } from 'rxjs/operators';
import { StoreDetails, ParsedStoreDetails } from '../types/StoreDetails';
import { StoreDataUtilsService } from './store-data-utils.service';

@Injectable({ providedIn: 'root' })
export class StoresApiService {

  private storeDataUtilsService:StoreDataUtilsService = new StoreDataUtilsService();

  private readonly storesApiUrl: string = 'https://www.countdown.co.nz/api/stores/?includeStoresEligibleForMyCd=true';

  constructor(private httpClient: HttpClient) { }

  public getStores(): any {
    return this.httpClient.get(this.storesApiUrl);
  }

  public getParsedStores(): any {
    return this.httpClient.get(this.storesApiUrl)
    .pipe(
      mergeMap((stores: StoreDetails[]) => this.storeDataUtilsService.converStoreDetailsArrayIntoParseDetailsArray(stores))
    )
  }

}
