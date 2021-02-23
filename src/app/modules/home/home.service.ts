import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_Cuisinelist } from 'src/api/store-data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Cuisines } from './modal/cuisines';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private restApiService: RestApiService) { }

  getCuisineData(): Observable<{ cuisines: Array<Cuisines> }> {
    return this.restApiService.get<{ cuisines: Array<Cuisines> }>(URL_Cuisinelist);
  }

}
