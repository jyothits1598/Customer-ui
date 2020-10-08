import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoresDataService {
  constructor(private restApiService: RestApiService) { }

  allStores(){
    return this.restApiService.get('api/stores/search');
  }

}
