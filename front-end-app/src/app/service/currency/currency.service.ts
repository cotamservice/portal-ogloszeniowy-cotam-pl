import {Injectable} from '@angular/core';
import {getCurrencies} from "../../../assets/js/currency/currency";
import {MapkaService} from "../mapka/mapka.service";
import {CountryService} from "../country/country.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies: [];

  constructor(private countryS: CountryService) {
    this.currencies = getCurrencies(this.countryS.getCodesAndNames());
  }

  getAllCurrencies() {
    let arr = [];
    for (let ele of this.currencies) {
      if (ele[0]) {
        arr.push([ele[0]['code'], ele[0]['currency']]);
      }
    }
    return arr;
  }

}


