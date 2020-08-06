import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  token: any;
  user: any;

  roles = {
    user: 'service_user',
    individual: 'individual',
    commission: 'commission',
    broker: 'broker'
  }

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService) {
  }


  registrationIndividual(user) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/registration/individual', user, {headers: headers})
      .pipe(map(res => res));
  }

  verifyEmail(value) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get('http://localhost:3000/account/registration/verify/email/' + value, {headers: headers})
      .pipe(map(res => res));
  }

  storeUser(token, user) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('authenticate_user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  authenticate(user) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/authenticate', user, {headers: headers})
      .pipe(map(res => res));
  }

  isAuthenticate() {
    return !this.jwt.isTokenExpired();
  }

  authenticateOut() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
}
