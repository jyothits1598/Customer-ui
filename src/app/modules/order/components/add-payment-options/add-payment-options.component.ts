import { Component, EventEmitter, OnInit,Output,TemplateRef } from '@angular/core';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { ComponentModalRef, ModalRef } from 'src/app/core/model/modal';
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'add-payment-options',
  templateUrl: './add-payment-options.component.html',
  styleUrls: ['./add-payment-options.component.scss']
})
export class AddPaymentOptionsComponent implements OnInit {
  modalRef: ModalRef;
  editMode: boolean = false;
 constructor(private orderView: OrderViewControllerService,
    private modalService: ModalService,
    ) {
      }
  ngOnInit(): void {
  }

  goBack() {
    this.orderView.showPage(OrderPages.CartSummary);
  }
  // showModal(temp: TemplateRef<any>) {
  //   this.modalRef = this.modalService.openTemplateModal(temp);
  // }

  receiveMessage($event) {
    if($event == 'true'){
      this.editMode = true;
    }else{
      this.editMode = false;
    }
  }

}
