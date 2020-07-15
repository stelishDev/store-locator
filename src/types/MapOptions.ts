export interface MapOptions {
  mapTypeId: string,
  zoomControl: boolean,
  scrollwheel: boolean,
  disableDoubleClickZoom: boolean,
  maxZoom: number,
  minZoom: number
}

export interface MapCenter {
  lat: number,
  lng: number
}
