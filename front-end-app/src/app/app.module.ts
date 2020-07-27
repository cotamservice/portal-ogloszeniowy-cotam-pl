import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes} from "@angular/router";
import { ToStartArrowComponent } from './to-start-arrow/to-start-arrow.component';

const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: RegistrationComponent},
  {path: 'authentication', component: AuthenticateComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RegistrationComponent,
        FooterComponent,
        AuthenticateComponent,
        HomeComponent,
        ToStartArrowComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
