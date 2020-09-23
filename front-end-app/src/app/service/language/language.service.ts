import {Injectable} from '@angular/core';
import {getAllNativeLanguages, getBrowserLang, getNativeName} from "../../../assets/js/languages/languages";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
  }

  getAllNativeLanguages(): Array<Array<string>> {
    let res = new Array<Array<string>>();
    for (let ele of getAllNativeLanguages()) {
      res.push(ele);
    }
    return res;
  }

  getFirstBrowserLangCode(): string {
    let langs = getBrowserLang();
    if (langs && langs[0].length > 0) {
      return langs[0].substring(0, 2);
    }
    return "";
  }

  getNativeNameByCode(code: string): string {
    return getNativeName(code);
  }
}
