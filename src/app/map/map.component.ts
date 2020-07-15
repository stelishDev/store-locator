import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StoreRegion, StoreDetails } from '../../types/StoreDetails';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  @ViewChild(MapMarker, {static: false}) public mapMarker: any;

  @Input()
  set stores(stores: StoreDetails[]) {
    console.log('stores:', stores);
    if (stores && stores.length) {
      if (stores.length === 1) {
        this.updateMap(stores[0]);
      }
      this.updateMarkers(stores);
    }
  }

  @Input()
  set selectedRegion(region: StoreDetails | StoreRegion) {
    console.log('region:', region);
    if (region) {
      this.updateMap(region);
    }
  }

  public selectedStore:StoreDetails;

  zoom = 5;

  mapCenter: google.maps.LatLngLiteral;

  mapOptions: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 20,
    minZoom: 0,
  };

  markers = [];

  infoContent = '';

  infoContentPosition: google.maps.LatLngLiteral;

  infoContentOptions: google.maps.InfoWindowOptions;

  constructor() { }

  ngOnInit(): void {
    //this.updateMap(this._stores, null);
  }

  private getUserLocation(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.mapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  public updateMap(coords: StoreDetails | StoreRegion): void {

    if (coords) {
      this.mapCenter = this.setMapCenter(coords);
      this.mapOptions = this.setMapOptions(coords);
    }
  }

  private setMapOptions(coords: StoreDetails | StoreRegion): google.maps.MapOptions {

    let options: google.maps.MapOptions = {} as google.maps.MapOptions;
    options.mapTypeId = 'roadmap';
    options.maxZoom = 20;
    options.minZoom = 5;

    if (coords) {

      this.zoom = coords.MapZoom;
      options.minZoom = coords.MapZoom;

    }
    return options;
  }

  private setMapCenter(coords: StoreDetails | StoreRegion): google.maps.LatLngLiteral {
    let center: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;

    if (coords) {
      center.lat = coords.Location.Latitude;
      center.lng = coords.Location.Longitude;

    } else {
      // set NZ
      center.lat = -40.9006;
      center.lng = 174.8860;
    }
    return center;
  }

    /**
   *
   */
  public updateMarkers(stores: StoreDetails[]): void {
    let markers = [];

    if (stores) {
      stores.forEach( store => {
        markers.push( this.createMarker(store) );
      });
    }
    this.markers = markers;
  }

  public createMarker(details: StoreDetails): any {
    const marker = {
      position: {
         lat: details.Location.Latitude,
         lng: details.Location.Longitude,
      },
      options: {
        icon: 'http://localhost:4200/assets/pin.png'
      },
      info: details
    };

    return marker;
  }

  public openInfo(marker: MapMarker, content:StoreDetails): void {
    this.selectedStore = content;
    this.updateMap(content);

    this.infoContentPosition = {
      lat: content.Location.Latitude,
      lng: content.Location.Longitude,

    } as google.maps.LatLngLiteral;

    this.infoContentOptions = {
      pixelOffset: new google.maps.Size(0, -38)
    };

    this.info.open(marker);
  }

  renderMap() {
    if(!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRmqZ-1VD-DbsccElMGtMtlRz9FndbPB4&amp;callback=initMap";

      window.document.body.appendChild(s);
    }
  }

}
