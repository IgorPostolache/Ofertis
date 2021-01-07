import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionUpdateComponent } from './subscription-update.component';

describe('SubscriptionUpdateComponent', () => {
  let component: SubscriptionUpdateComponent;
  let fixture: ComponentFixture<SubscriptionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
