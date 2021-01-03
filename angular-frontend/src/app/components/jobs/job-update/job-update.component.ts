import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addJob, updateJob } from 'src/app/core/store/actions/job.actions';
import { AppState, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent implements OnInit, OnDestroy {
  action: string;
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  job: Job = new Job();
  jobForm: FormGroup;
  id: number;

  constructor(
    private _store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this._store.select(selectJobState).pipe(takeUntil(this.destroy))
      .subscribe((res: any) => this.errorMessage = res.errorMessage ? res.errorMessage : null);
    this.id = this.route.snapshot.params['id'];
    this.action = this.id ? "update" : "add";
    this.jobForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ])
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  get name() { return this.jobForm.get('name'); }

  onSubmit(fromValue): void {
      this.job.name = this.capitalizeFirstLetter(fromValue.name);
      if (this.id) {
        this.job.id = this.id;
        this._store.dispatch(updateJob(Object.assign({}, this.job)));
      } else {
        this._store.dispatch(addJob({job: this.job}));
      }
  }

  private capitalizeFirstLetter(word: string): string {
    return word ? word[0].toUpperCase() + word.substr(1) : "";
  }

  goBack(): void {
    this.location.back();
  }

}
