import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_SetFavourite, URL_SetItemFavourite } from 'src/api/store-data';
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
  @Input() item: { id: number, isFavourite: boolean, page: string };
  // isFavourite: boolean;
  page: string;
  loading: boolean = false;
  current: { id: number, isFavourite: boolean, page: string };
  // preview_page_status: boolean = false;
  constructor(
    private snackBar: SnackBarService,
    private authService: AuthService,
    private modalService: ModalService,
    private restApiService: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.current = this.store || this.item;

    // if (this.store.page == 'preview') {
    //   this.preview_page_status = true;
    // }
  }

  onFavClick() {
    if (!this.authService.isLoggedIn) {
      // this.modalService.openComponentModal(LoginPromptComponent);
      this.router.navigateByUrl('/auth/signin');
      return;
    }
    this.loading = true;
    this.setFavourite(this.current.id, !this.current.isFavourite).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.current.isFavourite = !this.current.isFavourite;
        // this.snackBar.success(resp.data);
      },
      (resp) => this.snackBar.error(resp.error?.error_msg)
    );
  }

  setFavourite(storeId: number, isFavourite: boolean) {
    let url = this.store ? URL_SetFavourite(storeId) : URL_SetItemFavourite(storeId);
    if (isFavourite) return this.restApiService.post(url, {});
    else return this.restApiService.delete(url);
  }

}
