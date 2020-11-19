import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ComponentPopoverRef, PopoverRef } from 'src/app/core/model/popover';
import { PopoverService } from 'src/app/core/services/popover.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
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

  keyupSubs: any;
  loading: boolean;
  searchData: any;
  searchTerm: string;
  overlayOpen: boolean;
  popoverRef: PopoverRef


  constructor(
    private restApiService: RestApiService,
    private popoverService: PopoverService) { }

  ngAfterViewInit(): void {
    this.keyupSubs = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        debounce(() => interval(500)),
        tap((term) => {
          this.loading = true;
          this.searchTerm = term;
        }),
        switchMap((val) => this.restApiService.get(`api/stores/search?name=${val}`).pipe(finalize(() => this.loading = false))),
        map(resp => resp.data.stores || [])
      ).subscribe(res => { this.showResults(); this.searchData = res });
  }

  showResults() {
    if (!this.overlayOpen) this.openComponentPopover();
  }

  openComponentPopover(results = null) {
    if (this.overlayOpen) return;
    this.popoverRef = this.popoverService.openTemplatePopover(this.searchContainer, this.panelTemplate, { xPos: 'end', yPos: 'bottom', onDismiss: () => { this.overlayOpen = false } },)
    this.overlayOpen = true;
  }

  closePopover() {
    this.popoverRef.dismiss();
    this.overlayOpen = false;
  }

  createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[PopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  onSearchItemSelect(name: string) {
    this.closePopover();
    if(name){
      this.searchInput.nativeElement.value = name;
      this.searchTerm = name;
    }
  }

  ngOnDestroy(): void {
    this.keyupSubs.unsubscribe();
  }
}

