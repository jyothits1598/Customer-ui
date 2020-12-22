import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBtnComponent } from './state-btn.component';

describe('StateBtnComponent', () => {
  let component: StateBtnComponent;
  let fixture: ComponentFixture<StateBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
