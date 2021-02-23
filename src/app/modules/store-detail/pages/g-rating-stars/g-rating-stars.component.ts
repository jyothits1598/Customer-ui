import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-g-rating-stars',
  templateUrl: './g-rating-stars.component.html',
  styleUrls: ['./g-rating-stars.component.scss']
})
export class GRatingStarsComponent implements OnInit {
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
