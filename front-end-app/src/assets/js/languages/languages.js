// const ISO6391 = require('iso-639-1');
import ISO6391 from 'iso-639-1';

export function getAllNativeLanguages() {
  let res = [];
  for (let lang of ISO6391.getAllNativeNames()) {
    let code = ISO6391.getCode(lang);
    res.push([code, lang]);
  }
  return res;
}

export function getBrowserLang() {
  return navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages
}

export function getNativeName(code) {
  return ISO6391.getNativeName(code);
}
