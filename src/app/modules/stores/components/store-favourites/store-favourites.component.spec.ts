import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFavouritesComponent } from './store-favourites.component';

describe('StoreFavouritesComponent', () => {
  let component: StoreFavouritesComponent;
  let fixture: ComponentFixture<StoreFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
