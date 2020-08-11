import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RegistrationComponent} from './registration/registration.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';

import {ToStartArrowComponent} from './to-start-arrow/to-start-arrow.component';
import {RegistrationLoginComponent} from './registration-login/registration-login.component';
import {RegistrationIndividualComponent} from './registration-individual/registration-individual.component';
import {RegistrationCommissionComponent} from './registration-commission/registration-commission.component';
import {RegistrationBrokerComponent} from './registration-broker/registration-broker.component';
import {FormsModule} from "@angular/forms";
import {RegistrationFormValidationService} from "./service/form/registration-form-validation.service";
import {AuthenticateService} from "./service/authenticate/authenticate.service";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthenticateGuard} from "./authenticate.guard.ts";
import {JwtModule} from "@auth0/angular-jwt";
import {RegistrationLoginGoogleComponent} from './registration-login-google/registration-login-google.component';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi/lib/src";

let gapiClientConfig: NgGapiClientConfig = {
  discoveryDocs: [],
  client_id: "216771643471-695lth4b4nhl4qmqiqmjpkodtdfgpefb.apps.googleusercontent.com",
  redirect_uri: "http://localhost:4200/registration/google",
  scope: ['email', 'profile'].join(" ")
};

export function tokenGetter() {
  let localToken = localStorage.getItem("authenticate_token");
  let sessionToken = sessionStorage.getItem("authenticate_token");

  if (localToken !== null) {
    return localToken;
  } else if (sessionToken !== null) {
    return sessionToken;
  } else {
    return null;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    FooterComponent,
    HomeComponent,
    ToStartArrowComponent,
    RegistrationLoginComponent,
    RegistrationIndividualComponent,
    RegistrationCommissionComponent,
    RegistrationBrokerComponent,
    DashboardComponent,
    RegistrationLoginGoogleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200", "localhost:3000"],
      }
    }),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [RegistrationFormValidationService, AuthenticateService, AuthenticateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
