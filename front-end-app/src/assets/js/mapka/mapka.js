export function getCountries() {
  let europeRegions = [];
  let europe = [paths['firstId'], 'europe', paths['translateX'], paths['translateY'], paths['scaleFactor'], paths['scaleFactorX'], paths['scaleFactorY'], europeRegions];
  let countries = [europe];

  let indexEU = 0;
  for (let path in paths) {
    if (indexEU++ < 6) continue;
    europeRegions.push([paths[path]['secondId'], paths[path]['name'], paths[path]['path']]);
    let countryRegions = [];
    let country = [paths[path]['regions']['firstId'], paths[path]['name'], paths[path]['regions']['translateX'], paths[path]['regions']['translateY'], paths[path]['regions']['scaleFactor'], paths[path]['regions']['scaleFactorX'], paths[path]['regions']['scaleFactorY'], countryRegions];
    countries.push(country);
    let indexRegions = 0;
    for (let region in paths[path]['regions']) {
      if (indexRegions++ < 6) continue;
      countryRegions.push([paths[path]['regions'][region]['secondId'], paths[path]['regions'][region]['name'], paths[path]['regions'][region]['path']]);
    }
  }
  countries.sort((ele1, ele2) => {
    if (ele1[1] > ele2[1]) return 1;
    if (ele1[1] < ele2[1]) return -1;
    return 0;
  });
  return countries;
}

export function getCountryRegionsByCode(code) {
  for (let country of getCountries()) {
    if (code === country[0]) {
      return country[country.length - 1];
    }
  }
}

export function getEuropeRegions() {
  return getCountryRegionsByCode('EU');
}

export function getCountriesCodeAndName() {
  let result = [];
  for (let country of getCountries()) {
    if (country[0] !== 'EU') {
      result.push([country[0], country[1]]);
    }
  }
  return result;
}

export function getCountryRegionsCodeAndNameByCode(code) {
  let country = getCountryRegionsByCode(code);
  let result = [];
  for (let region of country) {
    result.push([region[0], region[1]]);
  }
  return result;
}

export function getEuropeRegionsCodeAndName() {
  return getCountryRegionsCodeAndNameByCode('EU');
}

export function getCountryByCode(code) {
  let countries = getCountries();
  for (let country of countries) {
    if (code === country[0]) return country;
  }
}

export function generate(htmlTagId, countryCode, callOnClick) {
  document.getElementById(htmlTagId).innerHTML = "";
  new Mapka(htmlTagId, countryCode.toUpperCase(), callOnClick);
}

export function generateAndClick(htmlTagId, countryCode, callOnClick, regionCode) {
  document.getElementById(htmlTagId).innerHTML = "";
  new Mapka(htmlTagId, countryCode.toUpperCase(), callOnClick, regionCode);
}

export function Mapka(htmlTagId, countryCode, callOnClick, clickedRegionCode) {
  let country = getCountryByCode(countryCode);
  let regions = [];
  let staticColor = '#f5f5f5';
  let clickColor = '#c7c7c7';
  let hoverColor = '#c7c7c7';
  let borderColor = '#c7c7c7';
  let borderWidth = 1.5;
  let containerW = document.getElementById(htmlTagId).clientWidth;
  let containerH = document.getElementById(htmlTagId).clientHeight;
  let r = Raphael(htmlTagId, containerW, containerH);

  let scaleFactor = country[4];
  let containerScaleFactor = containerW / containerH;
  let scaleX = country[5] * containerW;
  let scaleY = country[6] * containerH;
  let translateX = country[2];
  let translateY = country[3];

  let k = scaleFactor / containerScaleFactor;
  if (containerScaleFactor > scaleFactor) {
    scaleX = scaleX * k;
    let translateDeltaW = (containerW - containerH * scaleFactor) / scaleX;
    translateX = translateX + translateDeltaW / 2;
    borderWidth = borderWidth * scaleY;
  } else {
    scaleY = scaleY / k;
    let translateDeltaH = (containerH - containerW / scaleFactor) / scaleY;
    translateY = translateY + translateDeltaH / 2;
    borderWidth = borderWidth * scaleX;
  }
  let attributes = {
    fill: staticColor,
    stroke: borderColor,
    'stroke-width': borderWidth,
    'stroke-linejoin': 'round',
  };
  let clickedRegion = null;
  for (let region of country[country.length - 1]) {
    let obj = r.path(region[2]);
    regions.push(obj);
    obj.attr(attributes);
    obj.countryCode = country[0];
    obj.regionCode = region[0];
    obj.name = region[1];
    if (clickedRegionCode && region[0] === clickedRegionCode) {
      if (clickedRegion !== null) {
        clickedRegion.attr({
          fill: staticColor
        });
      }
      clickedRegion = obj;
      clickedRegion.attr({
        fill: clickColor
      });
    }
    obj
      .scale(scaleX, scaleY, 1, 1)
      .translate(translateX, translateY)
      .hover(function () {
        if (clickedRegion === null || clickedRegion.regionCode !== obj.regionCode) {
          obj.animate({
            fill: hoverColor
          }, 0);
        }
      }, function () {
        if (clickedRegion === null || clickedRegion.regionCode !== obj.regionCode) {
          obj.animate({
            fill: staticColor
          }, 0);
        }
      })

      .click(function () {
        if (clickedRegion !== null && clickedRegion.regionCode !== obj.regionCode) {
          clickedRegion.attr({
            fill: staticColor
          });
        }
        clickedRegion = obj;
        obj.attr({
          fill: clickColor
        });
        callOnClick(obj.countryCode, obj.regionCode, obj.name);
      });
  }
}
