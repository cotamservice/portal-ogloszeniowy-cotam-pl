import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticateS: AuthenticateService) {
  }

  ngOnInit(): void {
  }

  isPersonalCatPick: boolean = false;

  pickPersonalCat(): void {
    this.unPickAll();
    this.isPersonalCatPick = true;
    this.redirectTo('');
  }

  isMotorcycleCatPick: boolean = false;

  pickMotorcycleCat(): void {
    this.unPickAll();
    this.isMotorcycleCatPick = true;
  }

  isProviderCatPick: boolean = false;

  pickProviderCat(): void {
    this.unPickAll();
    this.isProviderCatPick = true;
  }

  isTruckCatPick: boolean = false;

  pickTruckCat(): void {
    this.unPickAll();
    this.isTruckCatPick = true;
  }

  isBuildCatPick: boolean = false;

  pickBuildCat(): void {
    this.unPickAll();
    this.isBuildCatPick = true;
  }

  isAgriculturalCatPick: boolean = false;

  pickAgriculturalCat(): void {
    this.unPickAll();
    this.isAgriculturalCatPick = true;
  }

  isTrailerCatPick: boolean = false;

  pickTrailerCat(): void {
    this.unPickAll();
    this.isTrailerCatPick = true;
  }

  isBusCatPick: boolean = false;

  pickBusCat(): void {
    this.unPickAll();
    this.isBusCatPick = true;
  }

  isShipCatPick: boolean = false;

  pickShipCat(): void {
    this.unPickAll();
    this.isShipCatPick = true;
  }

  isPlaneCatPick: boolean = false;

  pickPlaneCat(): void {
    this.unPickAll();
    this.isPlaneCatPick = true;
  }

  isPartCatPick: boolean = false;

  pickPartCat(): void {
    this.unPickAll();
    this.isPartCatPick = true;
  }

  isCountryPick: boolean = false;
  isCountryListOpen: boolean = false;
  pickedCountry: string = '';

  pickCountryCat(): void {
    if (this.isCountryPick) {
      this.closeCountryList();
      this.unPickAll();
    } else {
      this.unPickAll();
      this.isCountryPick = true;
      this.openCountryList();
    }
  }

  openCountryList(): void {
    this.isCountryListOpen = true;
  }

  closeCountryList(): void {
    this.isCountryListOpen = false;
  }

  pickCountry(code: string): void {
    this.pickedCountry = code;
    this.closeCountryList();
  }

  isLangPick: boolean = false;
  isLangListOpen: boolean = false;
  pickedLang: string = '';

  pickLangCat(): void {
    if (this.isLangPick) {
      this.closeLangList();
      this.unPickAll();
    } else {
      this.unPickAll();
      this.isLangPick = true;
      this.openLangList();
    }
  }

  openLangList(): void {
    this.isLangListOpen = true;
  }

  closeLangList(): void {
    this.isLangListOpen = false;
  }

  pickLang(code: string): void {
    this.pickedLang = code;
    this.closeLangList();
  }

  isCurrencyPick: boolean = false;
  isCurrencyListOpen: boolean = false;
  pickedCurrency: string = '';

  pickCurrencyCat(): void {
    if (this.isCurrencyPick) {
      this.closeCurrencyList();
      this.unPickAll();
    } else {
      this.unPickAll();
      this.isCurrencyPick = true;
      this.openCurrencyList();
    }
  }

  openCurrencyList(): void {
    this.isCurrencyListOpen = true;
  }

  closeCurrencyList(): void {
    this.isCurrencyListOpen = false;
  }

  pickCurrency(code: string): void {
    this.pickedCurrency = code;
    this.closeCurrencyList();
  }

  banknotesValue: number = 9999;

  pickBanknotes(): void {

  }


  menuPostAddName: string = 'dodaj ogłoszenie';
  isMenuAddPostPick: boolean = false;

  pickAddPost(): void {
    this.unPickAll();
    this.isMenuAddPostPick = true;
  }

  isParkingPick: boolean = false;
  parkingCount: number = 99;

  pickParking(): void {
    this.unPickAll();
    this.isParkingPick = true;
  }

  unPickAll(): void {
    this.isPersonalCatPick = false;
    this.isMotorcycleCatPick = false;
    this.isProviderCatPick = false;
    this.isTruckCatPick = false;
    this.isBuildCatPick = false;
    this.isAgriculturalCatPick = false;
    this.isTruckCatPick = false;
    this.isTrailerCatPick = false;
    this.isBusCatPick = false;
    this.isShipCatPick = false;
    this.isPlaneCatPick = false;
    this.isPartCatPick = false;
    this.isCountryPick = false;
    this.closeCountryList();
    this.isLangPick = false;
    this.closeLangList();
    this.isCurrencyPick = false;
    this.closeCurrencyList();
    this.isAccountPick = false;
    this.isMenuAddPostPick = false;
    this.isParkingPick = false;
  }

  isMobileMenuOpen: boolean = false;
  menuMobileTitle: string = 'menu';

  openMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    } else {
      this.isMobileMenuOpen = true;
    }
  }

  redirectTo(pagename: string, param?: object): void {
    if (param !== undefined) {
      this.router.navigate(['/' + pagename, param]);
    } else {
      this.router.navigate(['/' + pagename]);
    }
  }

  isAccountPick: boolean = false;
  accountTypeName: string;
  accountName: string;

  pickAccount(): void {
    this.unPickAll();
    this.isAccountPick = true;
    if (this.isLogin()) {
      //redirect to dashboard depend on role
      this.router.navigate(['dashboard']);
    } else {
      this.redirectTo('login');
    }
  }

  isLogin(): boolean {
    if (!this.authenticateS.isAuthenticate()) {
      this.accountName = 'Moje Konto';
      this.accountTypeName = '';
      return false;
    }
    return true;
  }

  isAccountBrokerLogin() {
    if (this.authenticateS.isAuthenticateBroker()) {
      let user: UserModel = this.authenticateS.getAuthenticateUser()
      this.accountName = user.email;
      this.accountTypeName = 'Dealer / Broker';
      return true;
    }
    return false;
  }

  isAccountCommissionLogin() {
    if (this.authenticateS.isAuthenticateCommission()) {
      let user: UserModel = this.authenticateS.getAuthenticateUser()
      this.accountName = user.email;
      this.accountTypeName = 'Komis';
      return true;
    }
    return false;
  }

  isAccountIndividualLogin() {
    if (this.authenticateS.isAuthenticateIndividual()) {
      let user: UserModel = this.authenticateS.getAuthenticateUser()
      this.accountName = user.email;
      this.accountTypeName = 'Indywidualne';
      return true;
    }
    return false;
  }
}
