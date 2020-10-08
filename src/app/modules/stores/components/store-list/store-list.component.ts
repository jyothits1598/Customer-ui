import { Component, OnInit } from '@angular/core';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  constructor(private storeData: StoresDataService) { }

  ngOnInit(): void {
    this.storeData.allStores().subscribe(console.log);
  }

}
