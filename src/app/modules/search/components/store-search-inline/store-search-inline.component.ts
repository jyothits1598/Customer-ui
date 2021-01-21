import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, interval, of, Subscription } from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  ComponentPopoverRef,
  PopoverConfig,
  PopoverRef,
} from 'src/app/core/model/popover';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SearchDataService } from '../../services/search-data.service';
import { SearchHistoryComponent } from '../search-panel/search-history/search-history.component';
import { SearchPanelComponent } from '../search-panel/search-panel.component';

@Component({
  selector: 'app-store-search-inline',
  templateUrl: './store-search-inline.component.html',
  styleUrls: ['./store-search-inline.component.scss'],
})
export class StoreSearchInlineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;
  @ViewChild('searchContainer', { read: ElementRef })
  searchContainer: ElementRef;
  @ViewChild('panelTemplate', { read: TemplateRef })
  panelTemplate: TemplateRef<any>;

  focusEntered = false;

  searchControl: FormControl = new FormControl(null);

  keyupSubs: Subscription;
  loading: boolean;
  searchData: any;
  searchTerm: string;
  popoverRef: PopoverRef;
  isMobile: boolean;

  get overlayOpen() {
    // return this.layoutService.isMobile;
    return this.searchDataServ.overlayOpen;
  }

  constructor(
    private restApiService: RestApiService,
    private popoverService: PopoverService,
    private layoutService: LayoutService,
    private searchDataServ: SearchDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngAfterViewInit(): void {
    this.searchDataServ.registerSearchElement(this.searchInput);
  }

  openSearchBox(): void {
    this.keyupSubs = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        tap((term) => {
          if (term) this.loading = true;
          this.searchTerm = term;
        }),
        filter((val) => val),
        debounce(() => interval(500)),
        switchMap((val) =>
          this.restApiService.get(`api/stores/search? + name=${val}`).pipe(
            finalize(() => (this.loading = false)),
            map((resp) => resp.data.stores || [])
          )
        )
      )
      .subscribe((res) => {
        this.searchData = res;
      });
    if (
      !this.searchDataServ.overlayOpen &&
      (this.searchDataServ.getHistory().length > 0 || this.searchData?.length)
    ) {
      this.openComponentPopover();
    }
  }

  closeSearchBox(): void {
    this.keyupSubs.unsubscribe();
    setTimeout(() => {
      if (this.popoverRef) this.popoverRef.dismiss();
      this.searchDataServ.overlayOpen = false;
    }, 100);
  }

  openComponentPopover(results = null) {
    let popoverConfig: PopoverConfig = {
      xPos: this.layoutService.isMobile ? 'center' : 'end',
      yPos: 'bottom',
      onDismiss: () => {
        this.searchDataServ.overlayOpen = false;
      },
    };
    // hasBackdrop ?: true | false;
    // darkBackground ?: true | false;
    if (this.searchDataServ.overlayOpen) return;
    this.popoverRef = this.popoverService.openTemplatePopover(
      this.searchContainer,
      this.panelTemplate,
      popoverConfig
    );
    this.searchDataServ.overlayOpen = true;
  }

  handleEnter(value) {
    this.searchInput.nativeElement.blur();
    this.closeSearchBox();
    if (value) {
      this.router.navigate(['/search'], { queryParams: { q: value } });
    }
  }

  onSearchItemSelect(name: string) {
    if (name) {
      this.searchInput.nativeElement.value = name;
      this.searchTerm = name;
      this.closeSearchBox();
    }
  }

  ngOnDestroy(): void {
    if (this.keyupSubs) this.keyupSubs.unsubscribe();
  }
}
