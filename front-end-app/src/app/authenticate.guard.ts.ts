import {Router, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticateService} from "./service/authenticate/authenticate.service";

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(
    private authenticateS: AuthenticateService,
    private router: Router) {
  }

  canActivate() {
    console.log('Authenticate Guard is here');
    if (!this.authenticateS.isAuthenticate()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
