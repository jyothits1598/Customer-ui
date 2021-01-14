import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {

  doPayment:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
