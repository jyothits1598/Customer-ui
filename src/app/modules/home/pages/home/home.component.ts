import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { SearchDataService } from 'src/app/modules/search/services/search-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _isHidden = false;
  isLoggedin: boolean;
  stateSubs: Subscription;
  isMobile: boolean;
  constructor(
    private authService: AuthService,
    protected searchService: SearchDataService,
    private layoutService: LayoutService
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngOnInit(): void {
    // this.isLoggedin$ = this.authService.isLoggedIn$();
    this.stateSubs = this.authService
      .isLoggedIn$()
      .subscribe((state) => (this.isLoggedin = state));
  }

  get isHidden(): boolean {
    return this.searchService.overlayOpen;
  }

  ngOnDestroy(): void {
    this.stateSubs.unsubscribe();
  }
}
