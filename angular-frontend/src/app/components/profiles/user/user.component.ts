import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_content: string | null;
  getProfile$: Observable<any>;

  constructor(private _store: Store<AppState>) {
    this.getProfile$ = this._store.select(selectProfileState);
  }

  ngOnInit(): void {
    this._store.dispatch(new UserProfile(''));
    this.getProfile$.subscribe(data => this.user_content = data.content);
  }

}
