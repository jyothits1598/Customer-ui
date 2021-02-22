import { AfterViewInit, Component, OnInit, NgModule, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AddPaymentOptionsComponent } from '../../order/components/add-payment-options/add-payment-options.component';
import { PaymentService } from '../services/payment.service';
declare var SqPaymentForm: any;
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  addCardForm: FormGroup = new FormGroup({
    nameOnCard: new FormControl(null, Validators.required),
   // billingAddress: new FormControl(null, Validators.required),
    billingCountry: new FormControl('AU', Validators.required)
  });
  saving: boolean = false;
  @Input() parentEvent: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private paymentService: PaymentService
  ) {
    var applicationId = "sandbox-sq0idb-wMz1w0wr63n-heDovPzHiw";
    // Set the location ID
    var locationId = "CBASELjav8kAOzgP4SZlbX46e_IgAQ";
    this.paymentForm = new SqPaymentForm({
      // Initialize the payment form elements
      applicationId: applicationId,
      locationId: locationId,
      inputClass: 'sq-input',
      autoBuild: false,
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '6px 16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: '#fff',
      }],

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '•••• •••• •••• ••••'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '4000',
        postalCodeValue: '123'
      },

      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            errors.forEach(function (error) {
              (<HTMLInputElement>document.getElementById(error.field)).innerHTML = error.message;
            });
            return;
          }
          // alert('Nonce received: ' + nonce); /* FOR TESTING ONLY */

          // Assign the nonce value to the hidden form field
          // document.getElementById('card-nonce').value = nonce;
          //needs to be extracted from the
          (<HTMLInputElement>document.getElementById('card-nonce')).value = nonce; //casting so .value will work
          //get this value from the database when the user is logged in
          (<HTMLInputElement>document.getElementById('sq-id')).value = "CBASEC8F-Phq5_pV7UNi64_kX_4gAQ";
          (<HTMLInputElement>document.getElementById('postal-code')).value = cardData.billing_postal_code;
          // POST the nonce form to the payment processing page
          (<HTMLFormElement>document.getElementById('nonce-form')).click();

        },

        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
        unsupportedBrowserDetected: function () {
          /* PROVIDE FEEDBACK TO SITE VISITORS */
          alert("Payment method not supported for this browser");
        },

        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
        inputEventReceived: function (inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              (<HTMLInputElement>document.getElementById(inputEvent.field)).innerHTML = '';
              /* HANDLE AS DESIRED */
              break;
            case 'focusClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'cardBrandChanged':
              /* HANDLE AS DESIRED */
              break;
            case 'postalCodeChanged':
              /* HANDLE AS DESIRED */
              break;
          }
        },

      }

    });
    this.paymentForm.build();
  }
  paymentForm;

  ngOnInit() {
  }
  requestCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    if (this.addCardForm.invalid) {
      this.addCardForm.markAllAsTouched();
      this.saving = false;
      return;
    }
    event.preventDefault();
    this.paymentForm.requestCardNonce();

  }
  ngAfterViewInit() { }

  addPaymentCard() {
    this.saving = true;
    var data = {
      'cardholder_name': this.addCardForm.controls.nameOnCard.value,
      //'billing_address': this.addCardForm.controls.billingAddress.value,
      'billing_country': this.addCardForm.controls.billingCountry.value,
      'postal_code': (<HTMLInputElement>document.getElementById('postal-code')).value,
      'card_nonce': (<HTMLInputElement>document.getElementById('card-nonce')).value,
    }
    this.paymentService.addPayment(data).pipe(finalize(() => { this.saving = false })).subscribe((resp) => {
      this.messageEvent.emit("false");
    });
  }

  backToPaymentMethod() {
    this.messageEvent.emit("false");
  }
  
}