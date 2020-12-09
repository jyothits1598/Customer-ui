import { Component, Input, OnInit } from '@angular/core';
import { TimeAvailability } from '../model/time-availability';

@Component({
  selector: 'next-availability',
  templateUrl: './next-availability.component.html',
  styleUrls: ['./next-availability.component.scss']
})
export class NextAvailabilityComponent implements OnInit {
  @Input() availability: Array<TimeAvailability>;
  nextAvailability: TimeAvailability;

  now = new Date();

  constructor() { }

  ngOnInit(): void {
    if (this.availability.length) {
      for (let i = 0; i < this.availability.length; i++) {
        let todayDay = this.now.getDay();
        if (todayDay === this.weekDayToNumber(this.availability[i].day)) {
          let startTime = new Date();
          startTime.setHours(this.gethours(this.availability[i].startTime), parseInt(this.availability[i].startTime.substr(3, 2)), 0);
          if (this.now > startTime) { this.nextAvailability = this.availability[i]; break; }
        }
        if (todayDay < this.weekDayToNumber(this.availability[i].day)) { this.nextAvailability = this.availability[i]; break; }
      }

      if (!this.nextAvailability) this.nextAvailability = this.availability[0];
    }
  }

  weekDayToNumber(day: string) {
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

  gethours(time: string) {
    let hours = parseInt(time.substr(0, 2));
    hours = hours % 12;
    return time.substr(5, 2) === 'AM' ? hours : hours + 12;
  }



}
