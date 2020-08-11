import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserModel} from '../../model/user.model';
import {RolesModel} from "../../model/roles.model";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private jwt: JwtHelperService) {
  }

  registrationIndividual(user: UserModel) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/registration/individual', user, {headers: headers})
      .pipe(map(res => res));
  }

  verifyEmail(value: string) {
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

}
