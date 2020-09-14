import {Injectable} from '@angular/core';
import {
  getCountries,
  getCountriesCodeAndName,
  getCountryRegionsByCode,
  getEuropeRegions,
  getCountryRegionsCodeAndNameByCode,
  getEuropeRegionsCodeAndName, getCountryByCode, generate, generateAndClick
} from "../../../assets/js/mapka/mapka";


@Injectable({
  providedIn: 'root'
})
export class MapkaService {

  constructor() {
  }

  generateRegions(countryCode: string, htmlTagId: string, callOnClick) {
    generate(htmlTagId, countryCode, callOnClick);
  }

  generateCountries(htmlTagId: string, callOnClick) {
    generate(htmlTagId, 'eu', callOnClick,);
  }

  getCountriesCodeAndName(): Array<Array<string>> {
    return getCountriesCodeAndName();
  }

  getRegionsCodeAndName(countryCode: string): Array<Array<string>> {
    return getCountryRegionsCodeAndNameByCode(countryCode);
  }

  generateRegionsAndClickByCode(countryCode: string, htmlTagId: string, callOnClick, regionCode: string) {
    generateAndClick(htmlTagId, countryCode, callOnClick, regionCode);
  }
}
