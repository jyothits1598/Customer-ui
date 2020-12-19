import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEmailComponent } from './mobile-email.component';

describe('MobileEmailComponent', () => {
  let component: MobileEmailComponent;
  let fixture: ComponentFixture<MobileEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
