import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ComponentPopoverRef, PopoverRef } from 'src/app/core/model/popover';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SearchPanelComponent } from '../search-panel/search-panel.component';

@Component({
  selector: 'app-store-search-inline',
  templateUrl: './store-search-inline.component.html',
  styleUrls: ['./store-search-inline.component.scss']
})
export class StoreSearchInlineComponent implements AfterViewInit {
  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef
  @ViewChild('searchContainer', { read: ElementRef }) searchContainer: ElementRef
  keyupSubs: any;
  loading: boolean;
  searchData: any;
  overlayOpen: boolean;
  // createdComponent: SearchPanelComponent;
  // overlayRef: OverlayRef;

  popoverRef: ComponentPopoverRef<SearchPanelComponent>;

  constructor(private restApiService: RestApiService, private overlay: Overlay,
    private vCRef: ViewContainerRef, private injector: Injector) { }

  ngAfterViewInit(): void {
    this.keyupSubs = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        tap((term) => {
          this.loading = true;
          if (this.overlayOpen) this.popoverRef.instance.searchTerm = term;
        }),
        debounce(() => interval(1000)),
        switchMap((val) => this.restApiService.get(`api/stores/search?name=${val}`).pipe(finalize(() => this.loading = false))),
        map(resp => resp.data.stores || [])
        // ).subscribe(res => this.searchData = res);
      ).subscribe(res => { this.showResults(res); this.searchData = res });
  }

  showResults(results) {
    if (this.overlayOpen) this.popoverRef.instance.results = results;
    else this.openComponentPopover(results)
  }

  openComponentPopover(results = null) {
    if (this.overlayOpen) return;

    let config = new OverlayConfig();
    config.hasBackdrop = true;
    config.backdropClass = '';
    config.positionStrategy = this.overlay.position().flexibleConnectedTo(this.searchContainer.nativeElement).withPositions([{
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    }]).withPush(false);

    let overlayRef = this.overlay.create(config);
    this.popoverRef = new ComponentPopoverRef<SearchPanelComponent>(overlayRef, null);
    overlayRef.backdropClick().subscribe(()=>this.popoverRef.dismiss());
    let compPortal = new ComponentPortal(SearchPanelComponent, null, this.createInjector(this.popoverRef, this.injector));
    this.popoverRef.instance = overlayRef.attach(compPortal).instance;
    this.popoverRef.onDismiss = () => { this.overlayOpen = false; }
    this.overlayOpen = true;
    this.popoverRef.instance.results = results;
  }

  closePopover() {
    this.popoverRef.dismiss();
    this.overlayOpen = false;
  }

  createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[PopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }
}

