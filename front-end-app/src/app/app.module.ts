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
import {RegistrationLoginFbComponent} from './registration-login-fb/registration-login-fb.component';

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
    RegistrationLoginFbComponent,
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

  ],
  providers: [RegistrationFormValidationService, AuthenticateService, AuthenticateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
