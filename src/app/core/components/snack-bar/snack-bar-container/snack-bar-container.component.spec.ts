import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarContainerComponent } from './snack-bar-container.component';

describe('SnackBarContainerComponent', () => {
  let component: SnackBarContainerComponent;
  let fixture: ComponentFixture<SnackBarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
