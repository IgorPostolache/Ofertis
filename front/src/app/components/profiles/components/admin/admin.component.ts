import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { adminProfile } from 'src/app/components/profiles/store/actions/profile.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  admin_content: string;
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(adminProfile());
    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => this.admin_content = data.content),
        err => this.errorMessage = err.errorMessage
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
