import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticateService} from "../service/authenticate/authenticate.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticateS: AuthenticateService) {
  }

  ngOnInit(): void {
  }

  openRegistration(): void {
    this.redirectTo('registration');
  }

  privacyPoliticLinkName: string = 'Polityka prywatności';
  adLinkName: string = 'Reklama';
  priceLinkName: string = 'Cennik';
  helpLinkName: string = 'Pomoc';
  contactLinkName: string = 'Kontakt';
  regulationLinkName: string = 'regulaminu';
  regulationAcceptationText: string = 'Korzystanie z serwisu oznacza akceptację';

  isLogin(): boolean {
    return this.authenticateS.isAuthenticate();
  }

  footerLogoutTitle: string = 'Zarejestruj się już teraz!';
  footerLogoutText: string = 'Dzięki rejestracji będziesz mógł zarządzać dodanymi ogłoszeniami, a także dodawać\n' +
    '          ogłoszenia do ulubionych, aby mieć do nich łatwy dostęp w każdej chwili!';

  redirectTo(pagename: string): void {
    this.router.navigate(['/' + pagename]);
  }
}
