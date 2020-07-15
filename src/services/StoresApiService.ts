import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StoresApiService {

  private readonly storesApiUrl: string = 'https://www.countdown.co.nz/api/stores/?includeStoresEligibleForMyCd=true';
  
  constructor(private httpClient: HttpClient) { }

  public getStores(): any {
    return this.httpClient.get(this.storesApiUrl);
  }

}
