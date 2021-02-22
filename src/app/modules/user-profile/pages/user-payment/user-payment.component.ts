import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss']
})
export class UserPaymentComponent implements OnInit {
  editMode: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event) {
      if($event == 'true'){
        this.editMode = true;
      }else{
        this.editMode = false;
      }
    }
}
