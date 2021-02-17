import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ReadUserDetails, User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserProfileDataService } from '../../services/user-profile-data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  user: User;
  loading: boolean = false;
  unSub$ = new Subject<true>();
  radius: FormControl;
  // isCustom: boolean

  constructor(private authService: AuthService,
    private profileData: UserProfileDataService,
    private sb: SnackBarService) { }

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.radius = new FormControl(this.user.radiusType === 'suggested' ? null : this.user.radius);
    // this.isCustom = this.user.radiusType === 'custom';
  }

  handleSel(event: any) {
    if (event === '0') this.radius.setValue(null);
    else this.radius.setValue(this.user.radius);
  }

  save() {
    this.loading = true;
    // let user = { ...this.user };
    // user.radius = this.radius.value;

    this.profileData.changeCustomRadius(this.radius.value ? 'custom' : 'suggested', this.radius.value).pipe(
      finalize(() => { this.loading = false }),
      takeUntil(this.unSub$)).subscribe((resp) => {
        this.user = ReadUserDetails(resp.data);
        this.authService.updateUser(this.user);
        this.sb.success(resp.message);
      });
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }
}