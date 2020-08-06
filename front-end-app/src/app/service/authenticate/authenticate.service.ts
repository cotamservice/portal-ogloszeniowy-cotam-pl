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
    try {
      console.log(this.getAuthenticationUser());
      console.log(this.getAuthenticationToken());
    } catch (e) {
      console.log(e);
    }
    console.log('IS TOKEN EXPIRE: ' + this.jwt.isTokenExpired());
    return !this.jwt.isTokenExpired();
  }

  authenticateOut(): void {
    localStorage.clear();
  }

  getAuthenticationUser(): UserModel {
    let val = JSON.parse(localStorage.getItem('authenticate_user'));
    console.log(val);
    let user: UserModel = new UserModel().deserializable(JSON.parse(localStorage.getItem('authenticate_user')));
    console.log('id:' + user.id);
    console.log('email:' + user.email);
    console.log('password:' + user.password);
    console.log('roles:' + user.roles);
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

  private getAuthenticationToken(): string {
    return localStorage.getItem('authenticate_token');
  }
}
