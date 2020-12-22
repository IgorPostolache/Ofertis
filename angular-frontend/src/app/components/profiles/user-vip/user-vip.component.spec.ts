import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserVipComponent } from './user-vip.component';

describe('UserVipComponent', () => {
  let component: UserVipComponent;
  let fixture: ComponentFixture<UserVipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
