import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsControlErrorComponent } from './abs-control-error.component';

describe('AbsControlErrorComponent', () => {
  let component: AbsControlErrorComponent;
  let fixture: ComponentFixture<AbsControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsControlErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
