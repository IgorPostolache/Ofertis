import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { userVipProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';
import { takeUntil } from 'rxjs/operators';
import { CustomerSub } from 'src/app/shared/models/customer/customer';

@Component({
  selector: 'app-user-vip',
  templateUrl: './user-vip.component.html',
  styleUrls: ['./user-vip.component.css']
})
export class UserVipComponent implements OnInit, OnDestroy {
  customerSub: CustomerSub = new CustomerSub();
  private destroy: Subject<boolean> = new Subject<boolean>();
  email: string;
  errorMessage: string;
  subList: any = [];
  token: string;
  user_vip: string;

  constructor(
    private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(userVipProfile());

    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => this.user_vip = data.content),
        err => this.errorMessage = err.errorMessage;
    this.email = localStorage.getItem("email");
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
