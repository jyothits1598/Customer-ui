import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobileComponent } from './change-mobile.component';

describe('ChangeMobileComponent', () => {
  let component: ChangeMobileComponent;
  let fixture: ComponentFixture<ChangeMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
