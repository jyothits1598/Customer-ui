import { Component, Input, OnInit } from '@angular/core';
import { TimeAvailability } from '../model/time-availability';

@Component({
  selector: 'app-next-availability',
  templateUrl: './next-availability.component.html',
  styleUrls: ['./next-availability.component.scss']
})
export class NextAvailabilityComponent implements OnInit {
  @Input() availability: Array<TimeAvailability>;
  nextAvailability: TimeAvailability;

  now = new Date();

  constructor() { }

  ngOnInit(): void {
    if (!this.availability.length) {
      this.nextAvailability = this.availability[0];

      for (let i = 1; i < this.availability.length; i++) {

      }
    }
  }

  checkNextAvailability(availability: TimeAvailability) {
    let day = this.weakDayToNumber(availability.day);
    if (this.now.getDay() === day) {
      
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

  gethours(time: string): number {
    let hours = parseInt(time.substr(0, 2));
    if (time.substr(5, 2) == 'PM' && hours !== 12) {
      return hours + 12;
    } else return hours;
  }



}
