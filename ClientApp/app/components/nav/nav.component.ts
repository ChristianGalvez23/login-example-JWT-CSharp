import { Component } from "@angular/core";

import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent {
  constructor(private _user: UserService) {}

  signedIn: boolean = false;
}
