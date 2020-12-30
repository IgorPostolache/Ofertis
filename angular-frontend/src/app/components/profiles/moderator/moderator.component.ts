import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModeratorProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {
  moderator_content: string | null;
  getProfile$: Observable<any>;

  constructor(private _store: Store<AppState>) {
    this.getProfile$ = this._store.select(selectProfileState);
   }

  ngOnInit(): void {
    this._store.dispatch(new UserModeratorProfile(''));
    this.getProfile$.subscribe(data => this.moderator_content = data.content);
  }

}
