export function getBrowserLocale() {
  let locales = navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages;
  if (locales && locales[0].length > 4) {
    return locales[0].trim().split(/-|_/)[0];
  } else if (locales && locales[0].length === 2) {
    return locales[0];
  } else {
    return ''
  }
}
