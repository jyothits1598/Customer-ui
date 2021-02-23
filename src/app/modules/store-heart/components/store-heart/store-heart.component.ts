import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_SetFavourite } from 'src/api/store-data';
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
  @Input() store: { id: number, isFavourite: boolean, page: string };
  isFavourite: boolean;
  loading: boolean = false;
  preview_page_status: boolean = false;
  constructor(
    private snackBar: SnackBarService,
    private authService: AuthService,
    private modalService: ModalService,
    private restApiService: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.isFavourite = this.store.isFavourite;
    if (this.store.page == 'preview') {
      this.preview_page_status = true;
    }
  }

  onFavClick() {
    if (!this.authService.isLoggedIn) {
      // this.modalService.openComponentModal(LoginPromptComponent);
      this.router.navigateByUrl('/auth/signin');
      return;
    }
    this.loading = true;
    this.setFavourite(this.store.id, !this.isFavourite).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.isFavourite = !this.isFavourite;
        // this.snackBar.success(resp.data);
      },
      (resp) => this.snackBar.error(resp.error?.error_msg)
    );
  }

  setFavourite(storeId: number, isFavourite: boolean) {
    if (isFavourite) return this.restApiService.post(URL_SetFavourite(storeId),{});
    else return this.restApiService.delete(URL_SetFavourite(storeId));
  }

}
