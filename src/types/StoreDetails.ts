export interface ParsedStoreDetails {
  ContactDetails: ContactDetails,
  Address: string,
  IsDryStore: boolean,
  Latitude: string,
  Location: StoreGeoLocation,
  Longitude: string,
  MapZoom: number,
  Name: string,
  OpeningHours: StoreHours[],
  PharmacyContactDetails: ContactDetails,
  PharmacyHolidayHours: StoreHours[],
  PharmacyOpeningHours: StoreHours[],
  Region: StoreRegion,
  StoreHasPharmacy: boolean,
  showStoreOpeningTimes?: boolean
}

export interface StoreHours {
  type: string,
  hours: OpeningHours;
}

export interface OpeningHours {
  periodStart: string,
  periodEnd: string,
  hourStart: string,
  hourEnd: string
}

export interface ContactDetails {
  streetNumber: string,
  streetAddress: string,
  suburb: string,
  city: string,
  postOfficeBox: string,
  phone: string,
  fax: string,
  email: string

}

export interface StoreDetails {
  Address: string,
  Brand: string,
  ContactDetails: string,
  DistanceToKm: number,
  HolidayHours: string,
  Id: string,
  IsCurrentUserStore: boolean,
  IsDarkStore: boolean,
  IsDryStore: boolean,
  IsEligibleForMyCd: boolean,
  Latitude: string,
  Location: StoreGeoLocation,
  Longitude: string,
  MapZoom: number,
  Name: string,
  NearbyStoreIdsString: string,
  NearbyStores: any[],
  NearbyStoresIds: any[],
  NodeId: number,
  OpeningHours: string,
  PharmacyContactDetails: string,
  PharmacyHolidayHours: string,
  PharmacyOpeningHours: string,
  Postcode: string,
  Region: StoreRegion,
  StoreHasPharmacy: boolean,
  showStoreOpeningTimes?: boolean
}

export interface StoreGeoLocation {
  Latitude: number,
  Longitude: number
}

export interface StoreRegion {
  Id: string,
  Name: string,
  NodeId: number,
  MapZoom: number,
  Location: StoreGeoLocation
}
