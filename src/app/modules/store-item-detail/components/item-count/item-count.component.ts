import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.scss']
})
export class ItemCountComponent implements OnInit {
  @Output() change = new EventEmitter<number>()
  count: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
