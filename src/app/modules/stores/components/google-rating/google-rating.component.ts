import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-rating',
  templateUrl: './google-rating.component.html',
  styleUrls: ['./google-rating.component.scss']
})
export class GoogleRatingComponent implements OnInit {
  @Input() rating: number;
  fullStars: Array<any>;
  emptyStars: Array<any>;
  halfStar: boolean;
  constructor() { }

  ngOnInit(): void {
    this.fullStars = new Array(Math.floor(this.rating));
    this.halfStar = !!(this.rating % 1);
    this.emptyStars = new Array(5 - Math.ceil(this.rating));
  }

}
