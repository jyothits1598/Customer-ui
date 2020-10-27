import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SnackBar } from 'src/app/core/model/snack-bar';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'snack-bar-container',
  templateUrl: './snack-bar-container.component.html',
  styleUrls: ['./snack-bar-container.component.scss'],
})
export class SnackBarContainerComponent implements OnInit {
  snackBars: Array<SnackBar> = [];
  constructor(private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.snackBarService.snackbars$.subscribe(snack => {
      this.snackBars = [snack, ...this.snackBars];
      setTimeout(() => {
        this.snackBars.pop();
      }, 2500);
    })
  }

}
