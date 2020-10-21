import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { UserLocation } from 'src/app/core/model/user-location';
import { GoogleLocationService } from '../../services/google-location.service';

@Component({
  selector: 'user-current-location',
  templateUrl: './user-current-location.component.html',
  styleUrls: ['./user-current-location.component.scss']
})
export class UserCurrentLocationComponent implements OnInit {
  locationError: boolean = false;
  locationLoading: boolean = false;
  constructor(private googleLocation: GoogleLocationService) { }
  @Output() currentLocation = new EventEmitter<UserLocation>()
  ngOnInit(): void {
  }

  handleLocReq() {
    this.locationLoading = true;
    this.googleLocation.getUserLocation().pipe(
      take(1),
      finalize(() => this.locationLoading = false)
    ).subscribe(
      loc => this.currentLocation.emit(loc),
      error => this.locationError = true
    );
  }

}
