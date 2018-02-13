import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _user: UserService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._user.isAuthenticated()) {
      this._router.navigate(["signIn"]);
      return false;
    }
    return true;
  }
}
