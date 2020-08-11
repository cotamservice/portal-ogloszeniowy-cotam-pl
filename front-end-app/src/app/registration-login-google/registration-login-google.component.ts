import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {UserModel} from "../model/user.model";
import {Router} from "@angular/router";
import {RolesModel} from "../model/roles.model";
import {NgZone} from "@angular/core";
/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
declare var gapi: any;

@Component({
  selector: 'app-registration-login-google',
  templateUrl: './registration-login-google.component.html',
  styleUrls: ['./registration-login-google.component.css']
})

export class RegistrationLoginGoogleComponent implements OnInit {


  constructor(private router: Router,
              private ngZone: NgZone,
              private authenticateS: AuthenticateService) {
  }

  ngOnInit() {

  }

  authenticateIn(): void {
    gapi.load('auth2', () => {
      let params = {
        client_id: '216771643471-695lth4b4nhl4qmqiqmjpkodtdfgpefb.apps.googleusercontent.com',
        scope: ['profile', 'email'].join(" "),
      };
      gapi.auth2.init(params)
        .then((googleAuth) => {
          googleAuth.signIn().then((googleUser) => {
            const googleEmail = googleUser.getBasicProfile().getEmail();
            const googleId = googleUser.getBasicProfile().getId();
            this.googleAuthenticate(googleEmail, googleId);
          });

        });
    });
  }

  private googleAuthenticate(googleEmail: string, googleId: string) {
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
                  this.ngZone.run(()=>this.router.navigate(['./dashboard'])).then();
                }
              });
          } else if (data['success'] === false) {
            this.authenticateS.registrationIndividual(user).subscribe(data => {
              if (data['success'] === true) {
                this.authenticateS
                  .authenticate(user)
                  .subscribe(data => {
                    if (data['success']) {
                      this.authenticateS.storeUser(data['token'], new UserModel().deserializable(data['user']), true);
                      this.ngZone.run(()=>this.router.navigate(['./dashboard'])).then();
                    }
                  });
              }
            })
          }
        });
    }
  }
}
