import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  varificationData: { type: 'email' | 'mobile', code: string, value: string };

  constructor(private router: Router,
    private route: ActivatedRoute) {

  }

  onPasswordChange() {
    this.router.navigate(['../success'], { relativeTo: this.route })
  }



}
