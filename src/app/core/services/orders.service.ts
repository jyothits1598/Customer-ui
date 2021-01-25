import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private restApiService: RestApiService) { }

  makeOrder(){
    return this.restApiService.post('api/customer/orders', {})
  }
}
