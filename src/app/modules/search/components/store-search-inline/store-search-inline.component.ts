import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
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
import { AuthService } from 'src/app/core/services/auth.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
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

  @ViewChildren('listItem') listItems: QueryList<ElementRef>;

  searchControl: FormControl = new FormControl(null);

  keyupSubs: Subscription;
  loading: boolean;
  searchData: any;
  searchTerm: string;
  popoverRef: PopoverRef;
  isMobile: boolean;

  history: Array<string>;

  get overlayOpen() {
    return this.searchDataServ.overlayOpen;
  }

  constructor(
    private restApiService: RestApiService,
    private popoverService: PopoverService,
    private layoutService: LayoutService,
    private searchDataServ: SearchDataService,
    private router: Router,
    private geoLoactionServ: GeoLocationService,
    private authService: AuthService
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngAfterViewInit(): void {
    this.searchDataServ.registerSearchElement(this.searchInput);
    this.history = this.searchDataServ.getHistory();
  }

  searchInputKeyup($event): void {
    switch ($event.code) {
      case 'Enter':
        this.searchForItem($event.target.value);
        break;
      case 'Escape':
        this.closeSearchBox();
        break;
      case 'ArrowDown':
        this.navToList();
        break;
      default:
        console.log(
          'searchInputKeyup(): key code not picked up: ',
          ($event as KeyboardEvent).code
        );
        break;
    }
  }

  searchListKeyup($event: KeyboardEvent, onIndex: number): void {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    switch ($event.code) {
      case 'ShiftLeft':
        this.isLeftShiftPressed = !this.isLeftShiftPressed;
        break;
      case 'ShiftRight':
        this.isRightShiftPressed = !this.isRightShiftPressed;
        break;
      case 'Enter':
        //this.searchForItem($event.target.value);
        break;
      case 'Escape':
        this.closeSearchBox();
        break;
      case 'Tab':
      case 'ArrowDown':
      case 'ArrowUp':
        this.navInList($event, onIndex);
        break;
      default:
        console.log(
          'searchListKeyup(): keycode not picked up: ',
          ($event as KeyboardEvent).code
        );
        break;
    }
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
          this.restApiService
            .get(
              `api/stores/search?${this.constructQuery(
                val,
                this.geoLoactionServ.getUserLocation()?.latLng,
                this.authService.loggedUser?.customRadius
              )}`
            )
            .pipe(
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

  navToList() {
    if (this.listItems.length > 0) {
      this.listItems.first.nativeElement.focus();
    }
  }

  private isLeftShiftPressed = false;
  private isRightShiftPressed = false;

  navInList($event: KeyboardEvent, curIndex: number) {
    const index = this.getNextIndex($event.code, curIndex);
    console.log(
      'navInList(): new index: ',
      index,
      'code: ',
      $event.code,
      ', curIndex: ',
      curIndex
    );
    if (index < 0) {
      this.searchInput.nativeElement.focus();
    } else if (index >= this.listItems.length) {
      this.closeSearchBox();
    } else {
      this.listItems.toArray()[index].nativeElement.focus();
    }
  }

  private getNextIndex(code: string, curIndex: number): number {
    let newIndex = curIndex;
    if (code === 'Tab') {
      // return this.isLeftShiftPressed || this.isRightShiftPressed
      //   ? --newIndex
      //   : ++newIndex;
      return newIndex;
    } else {
      return code === 'ArrowDown'
        ? ++newIndex
        : code === 'ArrowUp'
        ? --newIndex
        : newIndex;
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

  searchForItem(value: string) {
    if (value) {
      this.closeSearchBox();
      this.searchInput.nativeElement.value = value;
      this.searchInput.nativeElement.blur();
      this.searchDataServ.addItem(value);

      this.searchTerm = value;
      this.router.navigate(['/search'], { queryParams: { q: value } });
    }
  }

  constructQuery(
    name: string,
    latLng: { lat: number; lng: number },
    distance: number
  ) {
    let result = 'name=' + name;
    if (latLng)
      result += `&lat=${latLng.lat}&lng=${latLng.lng}&distance=${
        distance ? distance : 5
      }`;
    return result;
  }

  ngOnDestroy(): void {
    if (this.keyupSubs) this.keyupSubs.unsubscribe();
  }
}
