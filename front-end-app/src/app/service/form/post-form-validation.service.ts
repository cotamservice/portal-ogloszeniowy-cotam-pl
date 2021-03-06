import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostFormValidationService {

  constructor() {
  }

  isPostTitleValid(value: string): boolean {
    return value.length > 2;
  }

  isModelValid(value: string): boolean {
    return value.length > 0;
  }

  isMarkValid(value: string) {
    return value.length > 0;
  }

  isPhotosDescriptionValid(description: string) {
    return description.length > 0;
  }

  isCountryValid(country: string) {
    return country.length > 0;
  }

  isRegionValid(region: string) {
    return region.length > 0;
  }

  isCityValid(city: string) {
    return city.length > 0;
  }
}
