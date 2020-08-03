import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';

import { ToStartArrowComponent } from './to-start-arrow/to-start-arrow.component';
import { RegistrationLoginComponent } from './registration-login/registration-login.component';
import { RegistrationIndividualComponent } from './registration-individual/registration-individual.component';
import { RegistrationCommissionComponent } from './registration-commission/registration-commission.component';
import { RegistrationBrokerComponent } from './registration-broker/registration-broker.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RegistrationComponent,
        FooterComponent,
        AuthenticateComponent,
        HomeComponent,
        ToStartArrowComponent,
        RegistrationLoginComponent,
        RegistrationIndividualComponent,
        RegistrationCommissionComponent,
        RegistrationBrokerComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
