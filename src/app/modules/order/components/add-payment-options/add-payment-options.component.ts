import { Component, OnInit,TemplateRef } from '@angular/core';
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
  constructor(private orderView: OrderViewControllerService,
    private modalService: ModalService,
    ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.orderView.showPage(OrderPages.CartSummary);
  }
  showModal(temp: TemplateRef<any>) {
    this.modalRef = this.modalService.openTemplateModal(temp);
  }

}
