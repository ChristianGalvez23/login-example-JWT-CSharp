import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { SignInComponent } from "./components/signin/signin.component";

import { UserService } from "./services/user.service";
import { InterceptorAuth } from "./services/interceptor.service";
import { AuthGuardService } from "./services/auth-guard.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, SignInComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "signin", component: SignInComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [
    UserService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAuth,
      multi: true
    }
  ]
})
export class AppModuleShared {}
