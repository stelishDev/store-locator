import { Injectable } from '@angular/core';
import { StoreDetails, StoreHours, ParsedStoreDetails, OpeningHours, ContactDetails } from '../types/StoreDetails';
import { Observable, ObjectUnsubscribedError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataUtilsService {

  private phoneNumberRegex = /[(]{0,1}[0-9]{1,2}[)]\s[0-9]{3}\s[0-9]{4}/g;

  private betweenTagsRegex = /[^<\>]+(?=>)/g;

  private phoneOrFaxRegex = /,?  ?Phone:| ?Fax:/g;

  private lineBreakRegex = /<br \/>/g;

  private newLineRegex = /\n/g;

  private pharmacyEmailRegex = /[a-z]{3,}.pharmacy@countdown.co.nz/g;

  private dashOrToRegex = /-|to/g; // handles 7am - 7pm OR 7am to 7pm

  private tempClosedRegex = /temporarily closed/g;


  constructor() { }

  public extractPhoneNumberFromContactDetailsProp(store: ParsedStoreDetails): string {
    const num = store.ContactDetails.phone.match(this.phoneNumberRegex);
    return num && num.length ? num[0] : '';
  }

  /**
   * Replace html with raw address as string. Basically converts this:
   *
   * "<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;AMP Centre,
   * Ground Floor\nLower Albert Street\nAuckland, 1010&quot;}" data-sheets-userformat="{&quot;2&quot;:6659,
   * &quot;3&quot;:{&quot;1&quot;:0},&quot;4&quot;:[null,2,16777215],&quot;12&quot;:0,&quot;14&
   * quot;:[null,2,2236962],&quot;15&quot;:&quot;Arial, Helvetica, sans-serif&quot;}">
   * AMP Centre, Ground Floor<br />Lower Albert Street<br />Auckland, 1010</span></p>"
   *
   * And,
   *
   * <p>Cnr Anzac &amp; Clyde Roads<br />Browns Bay<br />Auckland<br />Phone: (09) 476 5974<br />Fax: (09) 476 5975</p>
   *
   * And,
   *
   * "<p>Cnr Te Irirangi Drive &amp; Ti Rakau Drive<br />Botany<br />Auckland<br />Store Ph: (09) 271 3634<br />
   * Store Fax: (09) 274 3751<br /><br /><strong>CD Pharmacy Botany</strong><br />Pharmacy Ph: (09) 255 9787 <br />
   * Pharmacy Fax: (09) 255 9786 <br />botany.pharmacy@countdown.co.nz<br /><em>Open Mon - Sun: 9am - 8pm</em></p>"
   *
   * To something like:
   *
   * "AMP Centre, Ground Floor, Lower Albert Street, Auckland, 1010"
   *
   * @param address
   */
  public extractAddressFromAddressProp(address: string): string {
    // convert \n  & <br /> to spaces
    return address.replace(this.newLineRegex, ' ')
    .replace(this.lineBreakRegex, ', ')
    // replace everything between <span
    .replace(this.betweenTagsRegex, '')
    .replace(/<>|&nbsp;/g, '')
    .replace(/ &amp;/g, '')

    // remove any phone numbers
    .replace(this.phoneNumberRegex, '')
    .replace(this.phoneOrFaxRegex, '')

    // replace email addresses
    .replace(this.pharmacyEmailRegex, '')

    // remove postcodes
    .replace(/,? [0-9]{4}/g, '')

    // remove store hours
    .replace(/Open [a-zA-Z]{3} - [a-zA-Z]{3}: [0-9]{1,}(am|pm) - ([0-9]{1,}(am|pm)|midnight)/g, '')

    // cleanup
    // TODO: tidy up these side effects
    .replace(/CD Pharmacy [a-zA-Z]{3,}/g, '')
    .replace(/,   ,?  | , /g, '')
    .replace(/ Phone:| Ph/g, '')
    .replace(/ Fax:| Fax/g, '')
    .replace(/,?Pharmacy:| ?:?Pharmacy,? /g, '')
    .replace(/, Store|:Store/g, '')
    .replace(/,?armacy(:Ph)? ?:?,|,?armacy/g, '')
    .replace(/  ? ?,?Bay/g, '');
  }

  public replaceLineBreaksWithCommas(store: StoreDetails): string {
    return store.Address.replace(this.lineBreakRegex, ',&nbsp;');
  }

  /**
   * Handles extracting opening hours from strings like the following:
   *
   * "<p>Mon - Sun: 7am - 7pm</p><p>Liquor trading hours:&nbsp;7am - 7pm</p>"
   *
   * And,
   *
   * "<p>Mon - Sun, 7am - midnight</p>↵<p>Liquor trading hours:&nbsp;7am - 11pm</p>"
   *
   * And,
   *
   * "<p>Pharmacy Ph: <a href="tel:+6475412245">(07) 541 2245</a><br />
   * Pharmacy Fax: <a href="tel:+6475412246">(07) 541 2246</a><br />bayfair.pharmacy@countdown.co.nz</p>
   * ↵<p><em>Open Mon - Sun: 9am - 8pm</em></p>
   * ↵<p>&nbsp;</p>
   * ↵<p><em>Store hours: Mon - Sun:&nbsp;7am - 10pm</em></p>"
   *
   * And,
   *
   * "<p>Mon - Sun: 9am-8pm</p><p>Store hours: Mon - Sun,&nbsp;7am - 10pm<br />
   * Alcohol trading hours&nbsp;7am - 10pm<br /><span>Store Ph:&nbsp;<a href="tel:+6492713634">
   * (09) 271 3634</a></span><br /><span>Store Fax:&nbsp;<a href="tel:+6492743751">(09) 274 3751</a></span></p>"
   *
   * @returns Array
   *
   * example below include extra time period for Liquour trading hours
   * [
   *  'Mon - Sun',
   *  '7am - 7pm',
   *  '7am - 7pm'
   * ]
   *
   * @param storeHours
   */
  public extractOpenHoursAsArray(storeHours: string): Array<string> {
    // remove phone number
    let arr = storeHours.split(/<p>|<\/p>/g).filter(s => { return s.length > 3 });
    let hours = [];
    arr.forEach(seg => {
      // given the current form of data pharmacy hours contain store and liquor hours
      // so we only need the pharmacy hours and discard the rest, so check the this segment
      // doesnt contain those parts
      if(!seg.match(/Store hours:|Alcohol trading hours/g) && !seg.match(/Pharmacy Ph/g)) {

        // split out content inside <p> tag by : inorder to extract days from hours
        // for example:
        // <p>Mon - Sun: 7am - 7pm</p> to ['Mon - Sun', '7am - 7pm']
        // <p>Mon - Sun, 7am to 10pm</p>
        const segments = seg.split(/:|,/g);

        segments.forEach( segment => {
          // format
          const update = segment.replace(/mon|Mon/g, 'Monday')
          .replace(/tue|Tue/g, 'Tuesday')
          .replace(/wed|Wed/g, 'Wednesday')
          .replace(/thu|Thu/g, 'Thursday')
          .replace(/fri|Fri/g, 'Friday')
          .replace(/sat|Sat/g, 'Saturday')
          .replace(/sun|Sun/g, 'Sunday')
          // trim
          .replace(/Liquor trading hours|&nbsp;/g, '')
          .replace(/:| /g, '')
          .replace(/<em>Open|<\/em>/g, '');

          if (update && update.length > 2) {
            hours.push(update);
          }
        });
      }
    });
    return hours;
  }

  public getStoreHoursObject(str: string): StoreHours[] {

    let hours:StoreHours[] = [];

    // check for Temporarily closed
    if(str.toLowerCase().match(this.tempClosedRegex)) {
      let storeHours:StoreHours = {} as StoreHours;
      storeHours.type = 'closed';
      hours.push(storeHours);
      return hours;
    }

    const hrsArr = this.extractOpenHoursAsArray(str);

    // handle store hours
    if (hrsArr && hrsArr.length > 1) {
      let storeHours:StoreHours = {} as StoreHours;
      storeHours.hours = {} as OpeningHours;

      storeHours.type = 'Store hours';
      storeHours.hours.periodStart = hrsArr[0].split('-')[0];
      storeHours.hours.periodEnd = hrsArr[0].split('-')[1];
      storeHours.hours.hourStart = hrsArr[1].split(this.dashOrToRegex)[0];
      storeHours.hours.hourEnd = hrsArr[1].split(this.dashOrToRegex)[1];

      hours.push(storeHours);
    }

    // handle liquor hours
    if (hrsArr && hrsArr.length === 3) {
      let liquorHours:StoreHours = {} as StoreHours;
      liquorHours.hours = {} as OpeningHours;

      liquorHours.type = 'Liquor trading hours';
      liquorHours.hours.periodStart = hrsArr[0].split('-')[0];
      liquorHours.hours.periodEnd = hrsArr[0].split('-')[1];
      liquorHours.hours.hourStart = hrsArr[2].split(this.dashOrToRegex)[0];
      liquorHours.hours.hourEnd = hrsArr[2].split(this.dashOrToRegex)[1];

      hours.push(liquorHours);
    }

    return hours;
  }

  /**
   * Get's contact details from HTML string like:
   *
   * "<p>Cnr Anzac &amp; Clyde Roads<br />Browns Bay<br />Auckland<br />
   * Phone: (09) 476 5974<br />Fax: (09) 476 5975<br /><br /> <strong>CD Pharmacy Browns Bay</strong><br />
   * Pharmacy Ph: (09) 475 9125<br />Pharmacy Fax: (09) 478 9008<br />brownsbay.pharmacy@countdown.co.nz<br />
   * <em>Open Mon - Sun: 9am - 8pm</em></p>"
   *
   * AND,
   *
   * "<p>Cnr Anzac &amp; Clyde Roads<br />Browns Bay<br />Auckland</p>
   * <p>Pharmacy Ph:&nbsp;(09) 475 9125<br />Pharmacy Fax:&nbsp;(09) 478 9008<br />brownsbay.pharmacy@countdown.co.nz</p>
   * <p>Free prescription* at this pharmacy.<br />*$5 off the standard subsidised patient co-payment charge</p>
   * <p>&nbsp;</p>"
   *
   * @returns ContactDetails
   * @param str
   */
  public getContactDetailsFromHTML(str: string): ContactDetails {
    let cd = {} as ContactDetails;

    // check for Pharmacy notes tag
    if (this.getPharmacyNotesFromContactString(str)) {
      const strArr = str.split(/<p>|<\/p>/g).filter(section => section.indexOf('Free prescription') === -1);
      str = '';
      strArr.forEach(s => str += s);
    }

    const numbers = str.match(this.phoneNumberRegex);
    const email = str.match(this.pharmacyEmailRegex);

    cd.physicalAddress = this.extractAddressFromAddressProp(str);
    cd.phone = numbers ? numbers[0] : '';
    cd.fax = numbers && numbers.length === 2 ? numbers[1] : '';
    cd.email = email && email.length ? email[0] : '';

    return cd;
  }

  public getPharmacyNotesFromContactString(str: string): string | null {
    const strArr = str.split(/<p>|<\/p>/g).filter(section => section.indexOf('Free prescription') !== -1);
    return strArr[0] || null;
  }

  public converStoreDetailsArrayIntoParseDetailsArray(sdArr: StoreDetails[]): Observable<Array<ParsedStoreDetails>> {
    let details: ParsedStoreDetails[] = [];
    return new Observable( (obs) => {
        sdArr.forEach(sd => {
          let psd:ParsedStoreDetails = {} as ParsedStoreDetails;
          // store hours
          psd.OpeningHours = this.getStoreHoursObject(sd.OpeningHours);
          psd.PharmacyOpeningHours = this.getStoreHoursObject(sd.PharmacyOpeningHours);
          psd.PharmacyHolidayHours = this.getStoreHoursObject(sd.PharmacyHolidayHours);
          psd.Address = this.extractAddressFromAddressProp(sd.Address);
          psd.ContactDetails = this.getContactDetailsFromHTML(sd.ContactDetails);
          psd.PharmacyContactDetails = this.getContactDetailsFromHTML(sd.PharmacyContactDetails);
          psd.PharmacyNotes = this.getPharmacyNotesFromContactString(sd.PharmacyContactDetails);
          psd.Name = sd.Name;
          psd.IsDryStore = sd.IsDryStore;
          psd.Latitude = sd.Latitude;
          psd.Location = sd.Location;
          psd.Longitude = sd.Longitude;
          psd.MapZoom = sd.MapZoom;
          psd.Region = sd.Region;
          psd.showStoreOpeningTimes = false;
          psd.StoreHasPharmacy = sd.StoreHasPharmacy;

          details.push(psd);
        });
      obs.next(details);
      obs.complete();
    });
  }

}

