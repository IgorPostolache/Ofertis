import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/components/auth/service/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string | null;
  user: User = new User();

  constructor(private authSrv: AuthService, private location: Location) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onSubmit(): void {
    this.authSrv.resetPasswordCheckEmail(this.user.email)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        res => {
          console.log(res);
          this.location.back();
        },
        err => this.errorMessage = err.error.message)
  }

}
