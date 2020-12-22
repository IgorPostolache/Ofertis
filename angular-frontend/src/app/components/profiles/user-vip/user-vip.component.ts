import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserVipProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-user-vip',
  templateUrl: './user-vip.component.html',
  styleUrls: ['./user-vip.component.css']
})
export class UserVipComponent implements OnInit {
  user_vip: string | null;
  getProfile$: Observable<any>;
  constructor(private _store: Store<AppState>) {
    this.getProfile$ = this._store.select(selectProfileState);
   }

  ngOnInit(): void {
    this._store.dispatch(new UserVipProfile(''));
    this.getProfile$.subscribe(data => this.user_vip = data.content);
  }

}
