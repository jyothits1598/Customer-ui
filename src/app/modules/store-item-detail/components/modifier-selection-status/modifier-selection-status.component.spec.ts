import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSelectionStatusComponent } from './modifier-selection-status.component';

describe('ModifierSelectionStatusComponent', () => {
  let component: ModifierSelectionStatusComponent;
  let fixture: ComponentFixture<ModifierSelectionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSelectionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSelectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
