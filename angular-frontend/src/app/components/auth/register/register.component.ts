import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPasswordStrength } from 'src/app/shared/misc/functions/checkPasswordStrength';
import { User } from 'src/app/shared/misc/functions/models/user/user';
import { AuthService } from 'src/app/shared/misc/functions/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  success = false;
  isSubmitted = false;
  message = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)

      ]),
      'username': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        Validators.email
      ]),
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

  private customPasswordValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPsw').value ? null : {'mismatch': true};
  }

  get name() { return this.registerForm.get('name'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPsw() { return this.registerForm.get('confirmPsw'); }
  get terms() { return this.registerForm.get('terms'); }

  onSubmit(formvalue): void {
    this.user.name = formvalue.name;
    this.user.username = formvalue.username;
    this.user.email = formvalue.email;
    this.user.password = formvalue.password;

    this.authService.register(this.user).subscribe(
      data => {
        this.message = data.message;
        this.success = !!data.success;
        this.isSubmitted = true;
        this.registerForm.reset();
      },
      err => {
        console.log(err);
        this.message = err.error.message;
        this.success = err.error.success;
        this.isSubmitted = true;
      }
    );

  }
}
