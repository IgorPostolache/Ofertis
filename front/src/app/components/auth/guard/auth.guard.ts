import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router){}
  canActivate(): boolean {
    if (this._authService.getJWT()) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
