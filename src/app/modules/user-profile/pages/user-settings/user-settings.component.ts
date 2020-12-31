import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserProfileDataService } from '../../services/user-profile-data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user: User;
  loading: boolean = false;

  constructor(private authService: AuthService,
    private profileData: UserProfileDataService) { }

  radius: FormControl;

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.radius = new FormControl(this.user.customRadius);
  }

  handleSel(event: any){
    if(event === '0') this.radius.setValue(null);
    else this.radius.setValue(5);
  }

  save() {
    this.loading = true;
    let user = { ...this.user };
    user.customRadius = this.radius.value;
    this.profileData.changeCustomRadius(user).pipe(finalize(() => { this.loading = false })).subscribe((resp) => { this.authService.setCustomRadius(this.radius.value) });
  }
}