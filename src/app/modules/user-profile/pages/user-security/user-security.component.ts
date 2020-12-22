import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss']
})
export class UserSecurityComponent implements OnInit {
  user: User
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.loggedUser
  }

}
