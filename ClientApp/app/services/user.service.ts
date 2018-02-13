import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Login } from "./../models/Login";
import { Token } from "./../models/Token";

import * as moment from "moment";

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  signIn(login: Login) {
    return this._http.post<Token>("user/signIn", login);
  }

  greet() {
    return this._http.get<string>("user/greet");
  }

  isAuthenticated(): boolean {
    let _expiration = localStorage.getItem("expiration");
    let _now = moment().format();
    if (_expiration && !moment(_now).isAfter(_expiration)) {
      return true;
    }
    return false;
  }
}
