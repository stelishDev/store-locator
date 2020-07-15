import { Injectable } from '@angular/core';
import { StoreDetails } from '../types/StoreDetails';

@Injectable({
  providedIn: 'root'
})
export class StoreDataUtilsService {

  constructor() { }

  public extractPhoneNumberFromContactDetailsProp(store: StoreDetails): string {
    const num = store.ContactDetails.match(/[(]{0,1}[0-9]{1,2}[)]\s[0-9]{3}\s[0-9]{4}/g);
    return num && num.length ? num[0] : '';
  }

  public replaceLineBreaksWithCommas(store: StoreDetails): string {
    return store.Address.replace(/<br \/>/g, ',&nbsp;');
  }

  public extractOpenHours(storeHours: string): Array<string> {
    let arr = storeHours.split(/<p>|<\/p>/g).filter(s => { return s.length > 3 });
    let hours = [];
    arr.forEach(seg => {
      const update = seg.replace(/mon|Mon/g, 'Monday')
      .replace(/tue|Tue/g, 'Tuesday')
      .replace(/wed|Wed/g, 'Wednesday')
      .replace(/thu|Thu/g, 'Thursday')
      .replace(/fri|Fri/g, 'Friday')
      .replace(/sat|Sat/g, 'Saturday')
      .replace(/sun|Sun/g, 'Sunday')
      .replace(/Sunday:|Sunday,/g, 'Sunday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
      .replace(/hours:|hours/g, 'hours&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

      hours.push(update);
    });
    // trim phone numbers
    return hours;
  }
}
