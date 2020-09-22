import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private localhost: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllUserSubscriptions(userId: string) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(this.localhost + 'usersubscription/all/' + userId, {headers: headers})
      .pipe();
  }
}
