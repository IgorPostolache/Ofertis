import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAdminProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin_content: string | null;
  getProfile$: Observable<any>;

  constructor(private _store: Store<AppState>) {
    this.getProfile$ = this._store.select(selectProfileState);
   }

  ngOnInit(): void {
    this._store.dispatch(new UserAdminProfile(''));
    this.getProfile$.subscribe(data => this.admin_content = data.content);
  }

}
