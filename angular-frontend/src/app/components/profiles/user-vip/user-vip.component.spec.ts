import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVipComponent } from './user-vip.component';

describe('UserVipComponent', () => {
  let component: UserVipComponent;
  let fixture: ComponentFixture<UserVipComponent>;

  beforeEach(async(() => {
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
