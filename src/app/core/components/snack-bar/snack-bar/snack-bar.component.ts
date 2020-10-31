import { Component, Input, OnInit } from '@angular/core';
import { SnackBar } from 'src/app/core/model/snack-bar';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
@Input() snackBar: SnackBar
  // errorMessage = false;
  // successMessage: string;

  constructor() { }

  ngOnInit(): void {
    // this.successMessage = this.snackBar.message;
  }

}
