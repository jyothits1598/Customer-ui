import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { URL_DeleteFavourite, URL_SetFavourite } from 'src/api/store-data';
import { LoginPromptComponent } from 'src/app/core/components/login-prompt/login-prompt.component';
import { SnackBarType } from 'src/app/core/model/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'store-heart',
  templateUrl: './store-heart.component.html',
  styleUrls: ['./store-heart.component.scss']
})
export class StoreHeartComponent implements OnInit {
  @Input() store: { id: number, isFavourite: boolean };
  isFavourite: boolean;
  loading: boolean = false;
  constructor(
    private snackBar: SnackBarService,
    private authService: AuthService,
    private modalService: ModalService,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.isFavourite = this.store.isFavourite;
  }

  onFavClick() {
    if (!this.authService.isLoggedIn) {
      this.modalService.openComponentModal(LoginPromptComponent);
      return;
    }
    this.loading = true;
    this.setFavourite(this.store.id, !this.isFavourite).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.isFavourite = !this.isFavourite;
        this.snackBar.Success(SnackBarType.success, resp.data);
      },
      (resp) => this.snackBar.Error(SnackBarType.error, resp.error?.error_msg)
    );


  }

  setFavourite(storeId: number, isFavourite: boolean) {
    if (isFavourite) return this.restApiService.post(URL_SetFavourite, {
      store_id: storeId,
      is_favourite: 1
    });
    else return this.restApiService.patch(URL_DeleteFavourite, {
      store_id: storeId,
      is_favourite: 0
    })
  }

}
