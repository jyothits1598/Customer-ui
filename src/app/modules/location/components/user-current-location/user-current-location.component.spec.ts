import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentLocationComponent } from './user-current-location.component';

describe('UserCurrentLocationComponent', () => {
  let component: UserCurrentLocationComponent;
  let fixture: ComponentFixture<UserCurrentLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCurrentLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCurrentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
