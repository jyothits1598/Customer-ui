import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInOptionsComponent } from './signed-in-options.component';

describe('SignedInOptionsComponent', () => {
  let component: SignedInOptionsComponent;
  let fixture: ComponentFixture<SignedInOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedInOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
