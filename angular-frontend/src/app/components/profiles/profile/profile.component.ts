import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { redirectProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(redirectProfile());
  }

}
