import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from 'src/app/core/store/app.states';
import { Logout } from 'src/app/core/store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  username: string | null;
  getAuthState: Observable<any>;
  getAuthStateSub;

  constructor(private _store: Store<AppState>) {
    this.getAuthState = this._store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getAuthStateSub = this.getAuthState.subscribe(
      data => {
        this.isAuthenticated = data.isAuthenticated;
        this.username = data.user ? data.user.username : null;
      } );
  }

  ngOnDestroy(): void {
    this.getAuthStateSub.unsubscribe();
  }

  logoutUser(): void {
    this._store.dispatch(new Logout());
  }
}
