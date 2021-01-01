import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState, selectAuthState } from 'src/app/core/store/app.states';
import { logout } from 'src/app/core/store/actions/auth.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  isAuthenticated: boolean;
  username: string;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select(selectAuthState).pipe(takeUntil(this.destroy)).subscribe((data: any) => {
      this.isAuthenticated = data.isAuthenticated;
      this.username = data.user ? data.user.username : null;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  logoutUser(): void {
    this._store.dispatch( logout());
  }
}
