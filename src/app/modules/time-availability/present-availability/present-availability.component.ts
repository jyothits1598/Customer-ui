import { Component, Input, OnInit } from '@angular/core';
import { TimeAvailability } from '../model/time-availability';

@Component({
  selector: 'present-availability',
  templateUrl: './present-availability.component.html',
  styleUrls: ['./present-availability.component.scss']
})
export class PresentAvailabilityComponent implements OnInit {
  _availability: Array<TimeAvailability>;
  openTimings: TimeAvailability;

  now = new Date();

  constructor() { }
  @Input() set availability(availability: Array<TimeAvailability>) {
    if (availability) {
      this._availability = availability;
    }
    for (const a in availability) {
      if (this.checkAvailability(availability[a])) this.openTimings = availability[a];
    }
  }

  ngOnInit(): void {
  }

  gethours(time: string) {
    let hours = parseInt(time.substr(0, 2));
    // if (time.substr(5, 2) == 'PM' && hours !== 12) {
    //   return hours + 12;
    // } else {
    //   if(hours)
    //   return hours;
    // }

    if (time.substr(5, 2) === 'PM') {
      if (hours === 12) return 12;
      else return hours + 12;
    } else {
      if (hours === 12) return 0;
      else return ;
    }
  }

  checkAvailability(availability: TimeAvailability): boolean {
    if (availability.markedAsClose) return false;

    let day = this.weakDayToNumber(availability.day);
    // switch (availability.day.toLowerCase()) {
    //   case 'sunday':
    //     day = 0;
    //     break;
    //   case 'monday':
    //     day = 1;
    //     break;
    //   case 'tuesday':
    //     day = 2;
    //     break;
    //   case 'wednesday':
    //     day = 3;
    //     break;
    //   case 'thursday':
    //     day = 4;
    //     break;
    //   case 'friday':
    //     day = 5;
    //     break;
    //   case 'saturday':
    //     day = 6;
    //     break;
    // }

    if (day == this.now.getDay()) {
      let end = new Date();
      end.setHours(this.gethours(availability.endTime), parseInt(availability.endTime.substr(3, 2)));
      if (this.now < end) {
        let start = new Date();
        start.setHours(this.gethours(availability.startTime), parseInt(availability.startTime.substr(3, 2)))

        if (this.now > start) return true;
      }
      return false;
    }
  }

  weakDayToNumber(day: string) {
    switch (day.toLowerCase()) {
      case 'sunday':
        return 0;
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
    }
  }

}
