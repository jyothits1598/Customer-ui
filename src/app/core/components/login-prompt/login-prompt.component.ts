import { Component, OnInit } from '@angular/core';
import { ComponentModalRef } from '../../model/modal';
import { ROUTE_SIGNIN } from '../../routes/routes';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss']
})
export class LoginPromptComponent implements OnInit {
  loginRoute = ROUTE_SIGNIN;
  constructor(public modalRef: ComponentModalRef) { }

  ngOnInit(): void {

  }

}
