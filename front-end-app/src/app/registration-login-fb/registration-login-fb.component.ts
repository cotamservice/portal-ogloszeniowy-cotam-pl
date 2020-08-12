import {Component, NgZone, OnInit} from '@angular/core';
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {UserModel} from "../model/user.model";
import {Router} from "@angular/router";
import {RolesModel} from "../model/roles.model";

declare const FB: any;

@Component({
  selector: 'app-registration-login-fb',
  templateUrl: './registration-login-fb.component.html',
  styleUrls: ['./registration-login-fb.component.css']
})
export class RegistrationLoginFbComponent implements OnInit {
  errorMsg: string = '';

  constructor(private router: Router,
              private ngZone: NgZone,
              private authenticateS: AuthenticateService) {
  }

  ngOnInit(): void {
    FB.init({
      appId: '2760793777538526',
      cookie: false,
      xfbml: true,
      version: 'v8.0'
    });
  }

  authenticateIn() {
    FB.login((response: any) => {
      if (response.status === 'connected') {
        let id = response.authResponse.userID;
        FB.api(`/${id}?fields=id,email`,
          (result) => {
            if (result && !result.error) {
              let email = result.email;
              if (email) {
                this.errorMsg = '';
                this.fbAuthenticate(email, id);
              } else {
                this.errorMsg = 'twój adres email nie widoczny, zmien ustawienia na FB';
              }
            }
          })
      }
    }, {scope: 'email'});
  }

  private fbAuthenticate(fbEmail: string, fbId: string) {
    if (fbEmail) {
      let user: UserModel = new UserModel();
      user.email = fbEmail;
      user.password = fbId;
      user.secretWord = fbId;
      user.roles = [RolesModel.UserRole, RolesModel.IndividualRole];
      user.isFBAuthenticate = true;
      user.isGoogleAuthenticate = false;
      console.log('USER: ' + user);
      this.authenticateS
        .verifyEmail(user.email)
        .subscribe(data => {
          if (data['success'] === true) {
            this.authenticateS
              .authenticate(user)
              .subscribe(data => {
                if (data['success']) {
                  this.authenticateS.storeUser(data['token'], new UserModel().deserializable(data['user']), true);
                  this.ngZone.run(() => this.router.navigate(['./dashboard'])).then();
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
                      this.ngZone.run(() => this.router.navigate(['./dashboard'])).then();
                    }
                  });
              }
            })
          }
        });
    }
  }
}

