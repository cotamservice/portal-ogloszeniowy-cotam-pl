const cc = require('currency-codes');

export function getCurrencies(countriesNames) {
  // return cc.codes();
  let result = [];
  for (let ele of countriesNames) {
    // let jsonEle = JSON.stringify(cc.country(ele[1]));
    // console.log(cc.country(ele[1])[0].code);
    result.push(cc.country(ele[1]));
  }
  return result;
}
