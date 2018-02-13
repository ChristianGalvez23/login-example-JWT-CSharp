import { Component } from "@angular/core";

import { UserService } from "./../../services/user.service";

import { Login } from "./../../models/Login";

import * as moment from "moment";

@Component({
  selector: "sign-in",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SignInComponent {
  _login: Login;
  token: any;
  serverMsg: string = "No server message.";

  constructor(private _user: UserService) {
    this._login = new Login();
  }

  signin(): void {
    this._user.signIn(this._login).subscribe(
      res => {
        let _oldToken = localStorage.getItem("token");
        let _oldExp = localStorage.getItem("experation");
        if (_oldToken && _oldExp) {
          console.log(
            "Deleting previous token and expiration saved...\n",
            _oldToken
          );
          localStorage.removeItem("token");
          localStorage.removeItem("expiration");
        } else {
          console.log("No previous token and expiration detected.");
        }
        this.token =
          res.token +
          "\n\nExpiration: " +
          moment(res.expiration).format("hh:mm:ss") +
          "\nTime now:" +
          moment().format("hh:mm:ss");
        console.log("Assigning new token and expiration...\n", this.token);
        localStorage.setItem("token", this.token);
        localStorage.setItem("expiration", res.expiration);
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

  validateToken(): void {
    console.log("Validating authorized method in server...");
    this._user.greet().subscribe(
      (res: any) => {
        this.serverMsg = res.message;
      },
      error => {
        this.serverMsg = "Unauthorized: Cannot connect to the server.";
      }
    );
  }

  validateExpiration(): void {
    if (this._user.isAuthenticated()) {
      this.serverMsg = "User is authenticated yet";
    } else {
      this.serverMsg = "User is not authenticated";
    }
  }
}
