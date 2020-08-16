import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GusService {
  private host = "http://localhost:3000/gus";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  getInfo(companyData, cb) {
    console.log('CLICK IN getInfo');
    return this.login()
      .subscribe((loginData) => {
        let getByData = {
          sid: loginData['sid'],
          regon: companyData.regon,
          nip: companyData.nip,
          krs: companyData.krs,
        };
        return this.http
          .post(this.host + '/get', getByData, {headers: this.genHeaders()})
          .pipe(map(res => res))
          .subscribe((companyData) => {
            return this.logout(getByData.sid).subscribe((logoutData) => {
              cb(companyData)
            });
          });
      });
  }

  login() {
    return this.http.get(this.host + "/login", {headers: this.genHeaders()})
      .pipe(map(res => res));
  }

  logout(sid) {
    return this.http.get(this.host + "/logout/" + sid, {headers: this.genHeaders()})
      .pipe(map(res => res));
  }

  genHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return headers;
  }

}
