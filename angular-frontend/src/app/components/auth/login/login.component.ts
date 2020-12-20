import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/core/store/actions/auth.actions';
import { AppState, selectAuthState } from 'src/app/core/store/app.states';
import { User } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private _store: Store<AppState>) {
    this.getState = this._store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage
    });
  }

  onSubmit(): void {
    this._store.dispatch(new Login(Object.assign({},this.user)));
  }

}
