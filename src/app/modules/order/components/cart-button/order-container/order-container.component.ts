import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss']
})
export class OrderContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (qp) => { console.log(qp) }
    )
  }

}
