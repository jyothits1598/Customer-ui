import { Component, Input, OnInit } from '@angular/core';
import { SnackBar, SnackBarType } from 'src/app/core/model/snack-bar';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  @Input() snackBar: SnackBar

  constructor() { }

  getClass() {
    switch (this.snackBar.type) {
      case SnackBarType.success:
        return 'success-mez'
      case SnackBarType.error:
        return 'failure-mez'
      default:
        break;
    }
  }

}
