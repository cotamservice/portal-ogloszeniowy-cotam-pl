import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserModel} from '../../model/user.model';
import {RolesModel} from "../../model/roles.model";


@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  constructor(
    private http: HttpClient,
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

  storeUser(token: string, user: UserModel) {
    localStorage.setItem('authenticate_token', token);
    localStorage.setItem('authenticate_user', JSON.stringify(user));
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
  }

  getAuthenticateUser(): UserModel {
    let user: UserModel = new UserModel().deserializable(JSON.parse(localStorage.getItem('authenticate_user')));
    console.log('is user role:' + user.roles.find(val => {
      return val === RolesModel.UserRole;
    }));
    console.log('is individual role:' + user.roles.find(val => {
      return val === RolesModel.IndividualRole;
    }));
    console.log('is commission role:' + user.roles.find(val => {
      return val === RolesModel.CommissionRole;
    }));
    console.log('is broker role:' + user.roles.find(val => {
      return val === RolesModel.BrokerRole;
    }));

    return user;
  }

  getAuthenticateToken(): string {
    return localStorage.getItem('authenticate_token');
  }

  isAuthenticateIndividual(): boolean {
    return this.getAuthenticateUser().roles.indexOf(RolesModel.IndividualRole) > -1;
  }

  isAuthenticateCommission(): boolean {
    return this.getAuthenticateUser().roles.indexOf(RolesModel.CommissionRole) > -1;
  }

  isAuthenticateBroker(): boolean {
    return this.getAuthenticateUser().roles.indexOf(RolesModel.BrokerRole) > -1;
  }
}
