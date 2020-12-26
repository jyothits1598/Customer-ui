import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLikeCountComponent } from './facebook-like-count.component';

describe('FacebookLikeCountComponent', () => {
  let component: FacebookLikeCountComponent;
  let fixture: ComponentFixture<FacebookLikeCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookLikeCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLikeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
