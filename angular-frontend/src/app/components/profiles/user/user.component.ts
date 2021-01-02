import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  user_content: string;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(userProfile());
    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => this.user_content = data.content),
        err => this.errorMessage = err.errorMessage
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
