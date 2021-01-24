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
  searchData: any;
  searchTerm: string;
  popoverRef: PopoverRef;
  isMobile: boolean;

  history: Array<string>;
  loading$ = this.searchDataService.isLoading$;
  searchResults$ = this.searchDataService.inlineSearchResults$;

  get overlayOpen() {
    return this.searchDataService.overlayOpen;
  }

  constructor(
    private popoverService: PopoverService,
    private layoutService: LayoutService,
    private searchDataService: SearchDataService,
    private router: Router
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngAfterViewInit(): void {
    this.history = this.searchDataService.getHistory();
  }

  searchInputKeyup($event): void {
    const value = $event.target.value;
    switch ($event.code) {
      case 'Enter':
        this.searchForItem(value);
        break;
      case 'Escape':
        this.closeSearchBox();
        break;
      case 'ArrowDown':
        this.navToList();
        break;
      default:
        this.searchTerm = value;
        this.searchDataService.updateInlineSearch(value);
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
        break;
    }
  }

  openSearchBox(): void {
    if (
      !this.searchDataService.overlayOpen &&
      (this.searchDataService.getHistory().length > 0 ||
        this.searchData?.length)
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
      this.searchDataService.overlayOpen = false;
    }, 100);
  }

  openComponentPopover(results = null) {
    let popoverConfig: PopoverConfig = {
      xPos: this.layoutService.isMobile ? 'center' : 'end',
      yPos: 'bottom',
      onDismiss: () => {
        this.searchDataService.overlayOpen = false;
      },
    };
    // hasBackdrop ?: true | false;
    // darkBackground ?: true | false;
    if (this.searchDataService.overlayOpen) return;
    this.popoverRef = this.popoverService.openTemplatePopover(
      this.searchContainer,
      this.panelTemplate,
      popoverConfig
    );
    this.searchDataService.overlayOpen = true;
  }

  searchForItem(value: string) {
    if (value) {
      this.closeSearchBox();
      this.searchInput.nativeElement.value = value;
      this.searchInput.nativeElement.blur();
      this.searchDataService.addItem(value);

      this.searchTerm = value;
      this.router.navigate(['/search'], { queryParams: { q: value } });
    }
  }

  ngOnDestroy(): void {
    if (this.keyupSubs) this.keyupSubs.unsubscribe();
  }
}
