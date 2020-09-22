import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private localhost: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllPromotions(){
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'promotion/all', {headers: headers})
      .pipe();
  }
}
