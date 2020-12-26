import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'facebook-like-count',
  templateUrl: './facebook-like-count.component.html',
  styleUrls: ['./facebook-like-count.component.scss']
})
export class FacebookLikeCountComponent implements AfterViewInit {
  @Input() url: string;
  @ViewChild('pbLikeContainer', { read: ElementRef }) pbContainer: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    if (this.url) FB.XFBML.parse(this.pbContainer.nativeElement);
   
  }

  ngOnInit(): void {
  }

}
