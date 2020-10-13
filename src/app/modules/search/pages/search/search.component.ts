import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  storeFilter;
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(filter(param => param.q)).subscribe(
      (param) => {
        if(param){
          console.log('params ', param)
          this.storeFilter = {name: param.q};
          console.log(this.storeFilter);
        }
      }
    )
  }

  handleTermSearch(term: string) {
    this.router.navigate(["."], { relativeTo: this.route, queryParams: { q: term } });
  }

}
