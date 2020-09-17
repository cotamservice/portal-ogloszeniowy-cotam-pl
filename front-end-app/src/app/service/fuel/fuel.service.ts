import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private localhost: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllFuels() {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'fuel/all', {headers: headers})
      .pipe(map(res => res));
  }
}
