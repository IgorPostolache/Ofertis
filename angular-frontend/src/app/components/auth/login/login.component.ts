import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState, selectAuthState } from 'src/app/core/store/app.states';
import { User } from 'src/app/shared/models/user/user';
import { login } from 'src/app/core/store/actions/auth.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string | null;
  user: User = new User();

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select(selectAuthState).pipe(takeUntil(this.destroy)).subscribe((state: any) => {
      this.errorMessage = state.errorMessage
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onSubmit(): void {
    this._store.dispatch(login(Object.assign({},this.user)));
  }

}
