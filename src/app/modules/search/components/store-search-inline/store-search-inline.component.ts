import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, interval, of, Subscription } from 'rxjs';
import { debounce, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ComponentPopoverRef, PopoverConfig, PopoverRef } from 'src/app/core/model/popover';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SearchDataService } from '../../services/search-data.service';
import { SearchHistoryComponent } from '../search-panel/search-history/search-history.component';
import { SearchPanelComponent } from '../search-panel/search-panel.component';

@Component({
  selector: 'app-store-search-inline',
  templateUrl: './store-search-inline.component.html',
  styleUrls: ['./store-search-inline.component.scss']
})
export class StoreSearchInlineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef
  @ViewChild('searchContainer', { read: ElementRef }) searchContainer: ElementRef;
  @ViewChild('panelTemplate', { read: TemplateRef }) panelTemplate: TemplateRef<any>;

  searchControl: FormControl = new FormControl(null);

  keyupSubs: Subscription;
  loading: boolean;
  searchData: any;
  searchTerm: string;
  overlayOpen: boolean;
  popoverRef: PopoverRef
  isMobile: boolean;

  constructor(
    private restApiService: RestApiService,
    private popoverService: PopoverService,
    private layoutService: LayoutService,
    private searchDataServ: SearchDataService,
    private router: Router,
    private route: ActivatedRoute) { this.isMobile = this.layoutService.isMobile; }

  ngAfterViewInit(): void {
    this.searchDataServ.registerSearchElement(this.searchInput);
  }

  onFocus() {
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
        switchMap((val) => this.restApiService.get(`api/stores/search?name=${val}`).pipe(finalize(() => this.loading = false), map(resp => resp.data.stores || []))),
      ).subscribe(res => { this.searchData = res; this.showResults(); });
    // this.keyupSubs = fromEvent(this.searchInput.nativeElement, 'keyup')
    //   .pipe(
    //     map((event: any) => event.target.value),
    //     distinctUntilChanged(),
    //     tap((term) => {
    //       if (term) this.loading = true;
    //       this.searchTerm = term;
    //     }),
    //     filter((val) => val),
    //     debounce(() => interval(500)),
    //     switchMap((val) => this.restApiService.get(`api/stores/search?name=${val}`).pipe(finalize(() => this.loading = false), map(resp => resp.data.stores || []))),
    //   ).subscribe(res => { this.searchData = res; this.showResults(); });

    this.showResults();
  }

  onBlur() {
    this.keyupSubs.unsubscribe();
    setTimeout(() => {
      this.closePopover();
    }, 100);
  }

  showResults() {
    if (this.shouldOpen()) this.openComponentPopover();
  }

  shouldOpen() {
    return !this.overlayOpen && (this.searchDataServ.getHistory().length > 0 || this.searchData?.length)
  }

  openComponentPopover(results = null) {
    let popoverConfig: PopoverConfig = {
      xPos: this.layoutService.isMobile ? 'center' : 'end',
      yPos: 'bottom',
      onDismiss: () => { this.overlayOpen = false; }
    }
    // hasBackdrop ?: true | false;
    // darkBackground ?: true | false;
    if (this.overlayOpen) return;
    this.popoverRef = this.popoverService.openTemplatePopover(this.searchContainer, this.panelTemplate, popoverConfig)
    this.overlayOpen = true;
  }

  closePopover() {
    this.popoverRef.dismiss();
    this.overlayOpen = false;
  }

  handleEnter(value) {
    this.searchInput.nativeElement.blur();
    this.closePopover();
    if (value) {
      this.router.navigate(['/search'], { queryParams: { q: value } })
    }
  }

  onSearchItemSelect(name: string) {
    if (name) {
      this.searchInput.nativeElement.value = name;
      this.searchTerm = name;
      this.closePopover();
    }
  }

  ngOnDestroy(): void {
    if (this.keyupSubs) this.keyupSubs.unsubscribe();
  }
}
