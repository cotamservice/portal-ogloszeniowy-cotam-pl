import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

import {AuthenticateGuard} from "./authenticate.guard.ts";
import {PostAddComponent} from "./post-add/post-add.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'registration', component: RegistrationComponent,
    children: [
      {path: 'individual', component: RegistrationComponent},
      {path: 'commission', component: RegistrationComponent},
      {path: 'broker', component: RegistrationComponent},
      {path: 'google', component: RegistrationComponent},
    ]
  },
  {path: 'postadd', component: PostAddComponent},
  {path: 'login', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
