import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/misc/functions/models/user/user';
import { AuthService } from 'src/app/shared/misc/functions/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService) { }
  isLogged = false;
  isSubmitted = false;
  errorMessage = '';

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      data => {
        console.log(data);
        this.isLogged = true;
        this.isSubmitted = true;
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLogged = false;
        this.isSubmitted = true;
      }
    );
  }
}
