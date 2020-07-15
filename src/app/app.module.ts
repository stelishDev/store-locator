import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TablistComponent } from './tablist/tablist.component';
import { StoreDetailsListComponent } from './store-details-list/store-details-list.component';
import { PhoneComponent } from './icons/phone/phone.component';
import { CarComponent } from './icons/car/car.component';
import { CaretDownComponent } from './icons/caret-down/caret-down.component';
import { CaretUpComponent } from './icons/caret-up/caret-up.component';
import { StoreDetailsCardComponent } from './store-details-card/store-details-card.component';
import { StoreDetailsCardShortComponent } from './store-details-card-short/store-details-card-short.component';
import { DropdownHeadingComponent } from './buttons/dropdown-heading/dropdown-heading.component';
import { DropdownSmallComponent } from './buttons/dropdown-small/dropdown-small.component';
import { StoreListFilterComponent } from './store-list-filter/store-list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TablistComponent,
    StoreDetailsListComponent,
    PhoneComponent,
    CarComponent,
    CaretDownComponent,
    CaretUpComponent,
    StoreDetailsCardComponent,
    StoreDetailsCardShortComponent,
    DropdownHeadingComponent,
    DropdownSmallComponent,
    StoreListFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
