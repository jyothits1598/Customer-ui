import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoginPromptComponent } from 'src/app/core/components/login-prompt/login-prompt.component';
import { SnackBarType } from 'src/app/core/model/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Store } from '../../model/store';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'store-heart',
  templateUrl: './store-heart.component.html',
  styleUrls: ['./store-heart.component.scss'],
})
export class StoreHeartComponent implements OnInit {
  @Input() store: Store;
  isFavourite: boolean;
  loading: boolean = false;
  constructor(private storeData: StoresDataService,
    private snackBar: SnackBarService,
    private authService: AuthService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.isFavourite = this.store.isFavourite;
  }

  onFavClick() {
    if (!this.authService.isLoggedIn) {
      this.modalService.openComponentModal(LoginPromptComponent);
      return;
    }
    this.loading = true;
    this.storeData.setFavourite(this.store.id, !this.isFavourite).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.isFavourite = !this.isFavourite;
        this.snackBar.show(SnackBarType.success, resp.data);
      },
      (resp) => this.snackBar.show(SnackBarType.error, resp.error?.error_msg)
    );
  }

}
