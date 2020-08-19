import {Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserModel} from '../../model/user.model';
import {RolesModel} from "../../model/roles.model";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {CompanyModel} from "../../model/company.model";
import {SalonModel} from "../../model/salon.model";

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    private jwt: JwtHelperService) {
  }

  registrationCommission(user: UserModel, company: CompanyModel, salon: SalonModel) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/registration/commission', [user, company, salon], {headers: headers})
      .pipe(map(res => res));
  }

  registrationIndividual(user: UserModel) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/registration/individual', user, {headers: headers})
      .pipe(map(res => res));
  }

  isEmailExist(value: string) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get('http://localhost:3000/account/registration/verify/email/' + value, {headers: headers})
      .pipe(map(res => res));
  }

  storeUser(token: string, user: UserModel, isRemember: boolean) {
    if (isRemember === true) {
      localStorage.setItem('authenticate_token', token);
      localStorage.setItem('authenticate_user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('authenticate_token', token);
      sessionStorage.setItem('authenticate_user', JSON.stringify(user));
    }
  }

  authenticate(user: UserModel) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/authenticate', user, {headers: headers})
      .pipe(map(res => res));
  }

  isAuthenticate(): boolean {
    return !this.jwt.isTokenExpired();
  }

  authenticateOut(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  getAuthenticateUser(): UserModel {
    let fromLocal = localStorage.getItem('authenticate_user');
    let fromSession = sessionStorage.getItem('authenticate_user');
    if (fromLocal !== null) {
      return new UserModel().deserializable(JSON.parse(fromLocal));
    } else if (fromSession !== null) {
      return new UserModel().deserializable(JSON.parse(fromSession));
    } else {
      return null;
    }
  }

  isAuthenticateIndividual(): boolean {
    if (this.isAuthenticate()) {
      return this.getAuthenticateUser().roles.indexOf(RolesModel.IndividualRole) > -1;
    }
    return false;
  }

  isAuthenticateCommission(): boolean {
    if (this.isAuthenticate()) {
      return this.getAuthenticateUser().roles.indexOf(RolesModel.CommissionRole) > -1;
    }
    return false;
  }

  isAuthenticateBroker(): boolean {
    if (this.isAuthenticate()) {
      return this.getAuthenticateUser().roles.indexOf(RolesModel.BrokerRole) > -1;
    }
    return false;
  }

  authenticateByFbGo(googleEmail: string, googleId: string, isGo: boolean, isFb: boolean) {
    if (googleEmail) {
      let user: UserModel = new UserModel();
      user.email = googleEmail;
      user.password = googleId;
      user.secretWord = googleId;
      user.roles = [RolesModel.UserRole, RolesModel.IndividualRole];
      user.isGoogleAuthenticate = isGo;
      user.isFBAuthenticate = isFb;

      this.isEmailExist(user.email)
        .subscribe(data => {
          if (data['success'] === true) {
            this.authenticateGoFbUser(user);
          } else if (data['success'] === false) {
            this.registrationIndividual(user).subscribe(data => {
              if (data['success'] === true) {
                this.authenticateGoFbUser(user);

              }
            })
          }
        });
    }
  }

  private authenticateGoFbUser(user) {
    this.authenticate(user)
      .subscribe(data => {
        if (data['success']) {
          this.storeUser(data['token'], new UserModel().deserializable(data['user']), true);
          this.ngZone.run(() => this.router.navigate(['./dashboard'])).then();
        }
      });
  }
}
