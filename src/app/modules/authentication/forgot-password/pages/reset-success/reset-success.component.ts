import { Component, OnInit } from '@angular/core';
import { ROUTE_SIGNIN } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-reset-success',
  templateUrl: './reset-success.component.html',
  styleUrls: ['./reset-success.component.scss']
})
export class ResetSuccessComponent implements OnInit {
  signInRoute = ROUTE_SIGNIN;
  constructor() { }

  ngOnInit(): void {
  }

}
