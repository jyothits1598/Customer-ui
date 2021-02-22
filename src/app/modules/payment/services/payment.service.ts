import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private restApiService: RestApiService
  ) { }

  addPayment(data){
    return this.restApiService.patch('api/v1/me/payment', data);
  }

  payMentCardDetails(){
    return this.restApiService.get('api/v1/me').pipe(map(
      resp => {
        return resp.data.payment_cards;
      }
    ))
  }
}
