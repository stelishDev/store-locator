import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-store-list-filter',
  templateUrl: './store-list-filter.component.html',
  styleUrls: ['./store-list-filter.component.scss']
})
export class StoreListFilterComponent implements OnInit {

  @Output() filterEvent:EventEmitter<string[]> = new EventEmitter();

  withPharmacy: boolean = false;

  withLiquor: boolean = false;

  showFilters: boolean = false;

  // TODO: convert to external enum
  filterType = {
    liquor: 'IsDryStore',
    pharmacy: 'StoreHasPharmacy'
  };

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilter(filter: string): void {
    if (this.filterType.liquor === filter) {
      this.withLiquor = !this.withLiquor;
    }

    if (this.filterType.pharmacy === filter) {
      this.withPharmacy = !this.withPharmacy;
    }

    const filtersCopy = [];

    if (this.withLiquor) {
      filtersCopy.push(this.filterType.liquor);
    }

    if (this.withPharmacy) {
      filtersCopy.push(this.filterType.pharmacy);
    }

    // emit event
    this.filterEvent.emit(filtersCopy);
  }

}
