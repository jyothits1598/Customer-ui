import { Component, OnInit } from '@angular/core';
import { StoresDataService } from 'src/app/modules/stores/services/stores-data.service';

@Component({
  selector: 'app-favourite-stores',
  templateUrl: './favourite-stores.component.html',
  styleUrls: ['./favourite-stores.component.scss']
})
export class FavouriteStoresComponent implements OnInit {

  constructor(private storeData: StoresDataService) { }

  ngOnInit(): void {
    this.storeData.allFavourites().subscribe(console.log);
  }

}
