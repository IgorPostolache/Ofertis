import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/core/store/actions/auth.actions';
import { AppState, selectAuthState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  getState: Observable<any>;

  constructor(private _store: Store<AppState>) {
    this.getState = this._store.select(selectAuthState);
   }

  ngOnInit(): void {
    this.getState.subscribe(state => this.isAuthenticated = state.isAuthenticated);
  }

  logout(): void {
    this._store.dispatch(new Logout());
  }

}
