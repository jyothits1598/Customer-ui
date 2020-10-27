import { Component, OnInit } from '@angular/core';
import { ComponentModalRef } from '../../model/modal';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss']
})
export class LoginPromptComponent implements OnInit {

  constructor(public modalRef: ComponentModalRef) { }

  ngOnInit(): void {

  }

}
