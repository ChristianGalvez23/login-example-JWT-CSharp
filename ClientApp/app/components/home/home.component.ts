import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  countriesList: any = [];

  constructor(private _countries: HttpClient) {}

  ngOnInit() {
    /*this._countries
      .get("https://restcountries.eu/rest/v2/all")
      .subscribe(res => {
        this.countriesList = res;
      });*/
  }
}
