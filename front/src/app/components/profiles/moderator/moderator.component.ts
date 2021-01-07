import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { moderatorProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  moderator_content: string;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(moderatorProfile());
    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => this.moderator_content = data.content),
        err => this.errorMessage = err.errorMessage;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
