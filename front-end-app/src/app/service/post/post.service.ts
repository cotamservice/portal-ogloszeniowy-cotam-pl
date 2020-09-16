import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private localhost: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }


  getAllMarks() {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'mark/all', {headers: headers})
      .pipe(map(res => res));
  }

  getAllModels() {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'mark/model/all', {headers: headers})
      .pipe(map(res => res));
  }

  getAllSalonsByUserId(creatorId) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'salon/all/' + creatorId, {headers: headers})
      .pipe(map(res => res));
  }

}
