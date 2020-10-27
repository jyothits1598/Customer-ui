import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedin$: Observable<boolean>;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();
  }

}
