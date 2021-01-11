import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoggedin: boolean;
  stateSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.isLoggedin$ = this.authService.isLoggedIn$();
    this.stateSubs = this.authService.isLoggedIn$().subscribe(state => this.isLoggedin = state);
  }

  ngOnDestroy(): void {
    this.stateSubs.unsubscribe();
  }
}
