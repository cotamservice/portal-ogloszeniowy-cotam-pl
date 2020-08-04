import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthenticateComponent} from "./authenticate/authenticate.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'registration', component: RegistrationComponent,
    children: [
      {path: 'individual', component: RegistrationComponent},
      {path: 'commission', component: RegistrationComponent},
      {path: 'broker', component: RegistrationComponent},
    ]
  },
  {path: 'login', component: RegistrationComponent},
  {path: 'authentication', component: AuthenticateComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
