import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { PopoverConfig, PopoverRef } from 'src/app/core/model/popover';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { NavbarService } from 'src/app/modules/navbar/services/navbar.service';
import { SearchDataService } from '../../services/search-data.service';

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

  finalise$ = new Subject<void>();

  searchControl: FormControl = new FormControl(null);

  popoverRef: PopoverRef;
  isMobile: boolean;

  history$ = this.searchDataService.searchHistory$;

  loading$ = this.searchDataService.isLoading$;
  searchResults$ = this.searchDataService.inlineSearchResults$;

  get overlayOpen() {
    return this.searchDataService.overlayOpen;
  }

  constructor(
    private popoverService: PopoverService,
    private layoutService: LayoutService,
    private searchDataService: SearchDataService,
    private navBarService: NavbarService,
    private router: Router
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngAfterViewInit(): void {
    this.searchDataService.fullSearchTerm$
      .pipe(takeUntil(this.finalise$))
      .subscribe((value) => this.searchControl.setValue(value));
  }

  searchInputKeyup($event): void {
    const value = $event.target.value;
    switch ($event.code || $event.keyCode) {
      case 'Enter':
      case 'NumpadEnter':
      case 13: //mobile keyboard enter
        this.searchForItem(value);
        break;
      case 'Escape':
        this.closeSearchBox();
        break;
      case 'ArrowDown':
        this.navToList();
        break;
      default:
        this.openSearchBox();
        this.searchDataService.updateInlineSearch(value);
        break;
    }
  }

  searchListKeyup($event, value: string, onIndex: number): void {
    switch ($event.code) {
      case 'Enter':
      case 'NumpadEnter':
        this.searchForItem(value);
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

  private docScrollPrevention($event: KeyboardEvent) {
    if ($event.code === 'ArrowUp' || $event.code === 'ArrowDown') {
      $event.preventDefault();
    }
  }

  openSearchBox(): void {
    document.addEventListener('keydown', this.docScrollPrevention);
    const inputVal = this.searchControl.value;
    if (inputVal) {
      this.searchDataService.updateInlineSearch(inputVal);
    }
    if (!this.searchDataService.overlayOpen) {
      this.openComponentPopover();
    }
  }

  closeSearchBox(): void {
    document.removeEventListener('keydown', this.docScrollPrevention);
    setTimeout(() => {
      if (this.popoverRef) this.popoverRef.dismiss();
      this.searchDataService.overlayOpen = false;
    }, 100);
  }

  navToList() {
    if (this.listItems.length > 0) {
      this.listItems.first.nativeElement.focus();
    }
  }

  navInList($event: KeyboardEvent, curIndex: number) {
    const index = this.getNextIndex($event.code, curIndex);
    if (index < 0) {
      this.searchInput.nativeElement.focus();
    } else if (index >= this.listItems.length) {
      this.listItems.last.nativeElement.focus();
    } else {
      this.listItems.toArray()[index].nativeElement.focus();
    }
  }

  private getNextIndex(code: string, curIndex: number): number {
    let newIndex = curIndex;
    if (code === 'Tab') {
      return newIndex;
    } else {
      return code === 'ArrowDown'
        ? ++newIndex
        : code === 'ArrowUp'
        ? --newIndex
        : newIndex;
    }
  }

  clearSearchInput($event: Event) {
    $event.stopPropagation();
    this.searchControl.setValue('');
    this.searchDataService.updateInlineSearch('');
    this.searchInput.nativeElement.focus();
    this.openSearchBox();
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

  private searchForItem(value: string, id: number = null) {
    if (value) {
      this.closeSearchBox();
      this.searchDataService.updateFullSearch(value);
      this.searchInput.nativeElement.blur();
      this.searchDataService.searchForTerm(value);
      if (id) this.router.navigateByUrl('/restaurants/' + id);
      else this.router.navigate(['/search'], { queryParams: { q: value } });
    }
  }

  ngOnDestroy(): void {
    this.finalise$.next();
    this.finalise$.complete();
  }
}
