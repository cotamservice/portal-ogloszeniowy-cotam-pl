import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {UserModel} from "../model/user.model";
import {GoogleApiService} from "ng-gapi/lib/src";
import {GoogleAuthService} from "ng-gapi/lib/src";
import {Router} from "@angular/router";
import {RolesModel} from "../model/roles.model";

@Component({
  selector: 'app-registration-login-google',
  templateUrl: './registration-login-google.component.html',
  styleUrls: ['./registration-login-google.component.css']
})

export class RegistrationLoginGoogleComponent implements OnInit {


  constructor(private googleAuth: GoogleAuthService,
              private googleApi: GoogleApiService,
              private router: Router,
              private authenticateS: AuthenticateService) {
  }

  ngOnInit() {
    this.googleApi.onLoad().subscribe(() => {

    });
  }

  authenticateIn(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signIn().then(res => {
        const googleEmail = res.getBasicProfile().getEmail();
        const googleId = res.getBasicProfile().getId();
        if (googleEmail) {
          let user: UserModel = new UserModel();
          user.email = googleEmail;
          user.password = googleId;
          user.secretWord = googleId;
          user.roles = [RolesModel.UserRole, RolesModel.IndividualRole];
          user.isGoogleAuthenticate = true;

          this.authenticateS
            .verifyEmail(user.email)
            .subscribe(data => {
              if (data['success'] === true) {
                this.authenticateS
                  .authenticate(user)
                  .subscribe(data => {
                    if (data['success']) {
                      this.authenticateS.storeUser(data['token'], new UserModel().deserializable(data['user']), true);
                      this.router.navigate(['dashboard']);
                    }
                  });
              } else if (data['success'] === false) {
                this.authenticateS.registrationIndividual(user).subscribe(data => {
                  if (data['success'] === true) {
                    console.log('email registration success');
                    this.authenticateS
                      .authenticate(user)
                      .subscribe(data => {
                        if (data['success']) {
                          this.authenticateS.storeUser(data['token'], new UserModel().deserializable(data['user']), true);
                          this.router.navigate(['dashboard']);
                        }
                      });
                  }
                })
              }
            });
        }
      });
    });
  }
}
