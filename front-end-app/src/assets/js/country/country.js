export function getBrowserLocale() {
  let locales = navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages;
  console.log("LOCALES: " + locales)
  console.log("LOCALES: " + locales[0])
  console.log("LOCALES: " + locales[1])
  console.log("LOCALES: " + locales[2])
  console.log("LOCALES: " + locales[3])
  console.log("LOCALES: " + locales[4])
  if (locales && locales[0].length > 4) {
    return locales[0].trim().split(/-|_/)[0];
  } else if(locales && locales[0].length === 2){
    return locales[0];
  } else {
    return ''
  }
}
