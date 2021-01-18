import { Component, Input, OnInit } from '@angular/core';
import { GoogleRatingService } from '../services/google-rating.service';

@Component({
  selector: 'google-rating',
  templateUrl: './google-rating.component.html',
  styleUrls: ['./google-rating.component.scss']
})
export class GoogleRatingComponent implements OnInit {
  @Input() store: { name: string, address: string };
  rating: number;
  constructor(private googleRating: GoogleRatingService) { }

  ngOnInit(): void {
    // this.googleRating.getRating(this.store.name, this.store.address).subscribe(
    //   (rat) => { this.rating = rat; }
    // )
  }

}
