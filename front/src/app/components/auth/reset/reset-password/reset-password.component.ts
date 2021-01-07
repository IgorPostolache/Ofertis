import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { checkPasswordStrength } from 'src/app/shared/misc/functions/checkPasswordStrength';
import { User } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  registerForm: FormGroup;
  token: string;
  user: User = new User();

  constructor(
    private authSrv: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  get password() { return this.registerForm.get('password'); }
  get confirmPsw() { return this.registerForm.get('confirmPsw'); }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.registerForm = new FormGroup({
      'password': new FormControl(null, [
        Validators.required,
        checkPasswordStrength(/^[A-Z]/, {hasCapitalLetter: true}),
        checkPasswordStrength(/^\w+[\W_]*\d/, {hasNumber: true}),
        checkPasswordStrength(/^[A-Z]+\d*[\W_]/, {hasSpecial: true}),
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      'confirmPsw': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      'terms': new FormControl(null, [
        Validators.required,
      ])
    }, this.customPasswordValidator);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onSubmit(formvalue): void {
    if (!this.token) this.errorMessage = "You don't have a token, please provide one."
    else {
      this.user.token = this.token;
      this.user.password = formvalue.password;
      this.authSrv.resetPassword(this.user)
        .pipe(takeUntil(this.destroy))
        .subscribe(
          res => this.router.navigate(['/login']),
          err => this.errorMessage = err);
    }
  }

  private customPasswordValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPsw').value ? null : {'mismatch': true};
  }
}
