import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-small',
  templateUrl: './dropdown-small.component.html',
  styleUrls: ['./dropdown-small.component.scss']
})
export class DropdownSmallComponent implements OnInit {

  @Output() openEvent = new EventEmitter();

  @Input()
  labelText: string;

  open: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.open = !this.open;
    this.openEvent.emit(this.open);
  }

}
