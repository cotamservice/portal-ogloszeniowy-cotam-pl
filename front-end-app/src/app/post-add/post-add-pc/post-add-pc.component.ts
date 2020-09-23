import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../model/category.model";
import {PostFormValidationService} from "../../service/form/post-form-validation.service";
import {PostService} from "../../service/post/post.service";
import {PostModel} from "../../model/post.model";
import {AuthenticateService} from "../../service/authenticate/authenticate.service";

import {MapkaService} from "../../service/mapka/mapka.service";
import {generate} from "../../../assets/js/mapka/mapka";
import {SalonModel} from "../../model/salon.model";
import {CurrencyService} from "../../service/currency/currency.service";
import {StateService} from "../../service/state/state.service";
import {FuelService} from "../../service/fuel/fuel.service";
import {DriveService} from "../../service/drive/drive.service";
import {GearboxService} from "../../service/gearbox/gearbox.service";
import {EquipmentService} from "../../service/equipment/equipment.service";
import {RegistrationFormValidationService} from "../../service/form/registration-form-validation.service";
import {PromotionModel} from "../../model/promotion.model";
import {PromotionService} from "../../service/promotion/promotion.service";
import {SubscriptionModel} from "../../model/subscription.model";
import {SubscriptionService} from "../../service/subscription/subscription.service";
import {UsersubscriptionModel} from "../../model/usersubscription.model";
import {LanguageService} from "../../service/language/language.service";
import {CountryService} from "../../service/country/country.service";

@Component({
  selector: 'app-post-add-pc',
  templateUrl: './post-add-pc.component.html',
  styleUrls: ['./post-add-pc.component.css']
})
export class PostAddPcComponent implements OnInit {
  isPersonalCatPick: boolean = true;
  isMotorcycleCatPick: boolean;
  isProviderCatPick: boolean;
  isTruckCatPick: boolean;
  isBuildCatPick: boolean;
  isAgriculturalCatPick: boolean;
  isTrailerCatPick: boolean;
  isBusCatPick: boolean;
  isShipCatPick: boolean;
  isPlaneCatPick: boolean;
  isPartCatPick: boolean;

  value = {
    pickedCat: '',
    title: '',
    markId: '',
    model: [],
    marks: [],
    models: [],
    mileage: 0,
    productionYear: 0,
    photos: [],
    photosPreview: [],
    photosDescription: '',
    photosAndDescription: [],
    country: '',
    region: '',
    city: '',
    countries: [],
    regions: [],
    cities: [],
    range: 0,
    salon: new SalonModel(),
    pickedSalon: '',
    salons: [],
    price: 0,
    currency: '',
    currencies: [],
    isGiveInvoice: false,
    isPriceNetto: false,
    state: '',
    states: [],
    isDmg: false,
    isFirstDriver: false,
    isNoAccidents: false,
    hasCarBook: false,
    fuel: '',
    fuels: [],
    enginePower: 0,
    engineDisplacement: 0,
    engineDrive: '',
    engineDrives: [],
    engineGearbox: '',
    engineGearboxes: [],
    bodySeats: 0,
    bodyDoors: 0,
    bodyColor: '',
    equipment: [],
    equipments: [],
    extraEquipment: [],
    vin: '',
    name: '',
    email: '',
    phone: '',
    phoneLanguages: [],
    languages: [],
    phones: [],
    resumption: false,
    dayLength: 0,
    startFrom: new Date().toDateString(),
    minStartFrom: '',
    maxStartFrom: '',
    whenStartFrom: 0,
    promotions: new Array<PromotionModel>(),
    promotion: new PromotionModel(),
    usersubscription: new UsersubscriptionModel(),
    selectedUsersubscriptionId: '',
    usersubscriptions: new Array<UsersubscriptionModel>(),
    isRegulationAccept: false,
    isRodoAccept: false,
  }

  isValid = {
    title: true,
    markId: true,
    marks: true,
    model: true,
    models: true,
    mileage: true,
    productionYear: true,
    photos: true,
    photosDescription: true,
    country: true,
    region: true,
    city: true,
    salon: true,
    pickedSalon: true,
    price: true,
    currency: true,
    isGiveInvoice: true,
    isPriceNetto: true,
    state: true,
    fuel: true,
    enginePower: true,
    engineDisplacement: true,
    engineDrive: true,
    engineGearbox: true,
    bodySeats: true,
    bodyDoors: true,
    bodyColor: true,
    equipment: true,
    extraEquipment: true,
    name: true,
    email: true,
    phone: true,
    resumption: true,
    dayLength: true,
    isRegulationAccept: true,
    isRodoAccept: true,
  }

  invalidMsg = {
    title: '',
    markId: '',
    model: '',
    marks: '',
    models: '',
    mileage: '',
    productionYear: '',
    photos: '',
    photosDescription: '',
    country: '',
    region: '',
    city: '',
    salon: '',
    pickedSalon: '',
    price: '',
    currency: '',
    isGiveInvoice: '',
    isPriceNetto: '',
    state: '',
    fuel: '',
    enginePower: '',
    engineDisplacement: '',
    engineDrive: '',
    engineGearbox: '',
    bodySeats: '',
    bodyDoors: '',
    bodyColor: '',
    equipment: '',
    extraEquipment: '',
    name: '',
    email: '',
    phone: '',
    dayLength: '',
    isRegulationAccept: '',
    isRodoAccept: '',
  };

  constructor(
    private validationS: PostFormValidationService,
    private postS: PostService,
    private authenticateS: AuthenticateService,
    private mapkaS: MapkaService,
    private currencyS: CurrencyService,
    private stateS: StateService,
    private fuelS: FuelService,
    private driveS: DriveService,
    private gearboxS: GearboxService,
    private equipmentS: EquipmentService,
    private registrationFormV: RegistrationFormValidationService,
    private promotionS: PromotionService,
    private subscriptionS: SubscriptionService,
    private languageS: LanguageService,
    private countryS: CountryService,
  ) {
  }

  ngOnInit(): void {
    this.setAllMarks();
    this.setAllModels();
    this.value.countries = this.mapkaS.getCountriesCodeAndName();
    this.updateCountries();
    this.setDefaultCountry();
    this.value.currencies = this.currencyS.getAllCurrencies();
    this.setStates();
    this.setFuels();
    this.setEngineDrives();
    this.setEngineGearboxes();
    this.setEquipments();
    this.setLoginEmail();
    this.setLanguages();
    this.setMinStartFrom();
    this.setMaxStartFrom();
    this.setPromotions();
    this.setUserSubscriptions();
  }

  unPickAll(): void {
    this.isPersonalCatPick = false;
    this.isMotorcycleCatPick = false;
    this.isProviderCatPick = false;
    this.isTruckCatPick = false;
    this.isBuildCatPick = false;
    this.isAgriculturalCatPick = false;
    this.isTrailerCatPick = false;
    this.isBusCatPick = false;
    this.isShipCatPick = false;
    this.isPlaneCatPick = false;
    this.isPartCatPick = false;
  }

  pickPersonalCat(): void {
    this.unPickAll();
    this.isPersonalCatPick = true;
    this.value.pickedCat = CategoryModel.PersonalCat;
  }

  pickMotorcycleCat(): void {
    this.unPickAll();
    this.isMotorcycleCatPick = true;
    this.value.pickedCat = CategoryModel.MotorcycleCat;
  }

  pickProviderCat(): void {
    this.unPickAll();
    this.isProviderCatPick = true;
    this.value.pickedCat = CategoryModel.ProviderCat;
  }

  pickTruckCat(): void {
    this.unPickAll();
    this.isTruckCatPick = true;
    this.value.pickedCat = CategoryModel.TruckCat;
  }

  pickBuildCat(): void {
    this.unPickAll();
    this.isBuildCatPick = true;
    this.value.pickedCat = CategoryModel.BuildCat;
  }

  pickAgriculturalCat(): void {
    this.unPickAll();
    this.isAgriculturalCatPick = true;
    this.value.pickedCat = CategoryModel.AgriculturalCat;
  }

  pickTrailerCat(): void {
    this.unPickAll();
    this.isTrailerCatPick = true;
    this.value.pickedCat = CategoryModel.TrailerCat;
  }

  pickBusCat(): void {
    this.unPickAll();
    this.isBusCatPick = true;
    this.value.pickedCat = CategoryModel.BusCat;
  }

  pickShipCat(): void {
    this.unPickAll();
    this.isShipCatPick = true;
    this.value.pickedCat = CategoryModel.ShipCat;
  }

  pickPlaneCat(): void {
    this.unPickAll();
    this.isPlaneCatPick = true;
    this.value.pickedCat = CategoryModel.PlaneCat;
  }

  pickPartCat(): void {
    this.unPickAll();
    this.isPartCatPick = true;
    this.value.pickedCat = CategoryModel.PartCat;
  }

  isCatPicked(): boolean {
    return this.value.pickedCat.length > 0;
  }

  isTitleValid(): boolean {
    this.isValid.title = this.validationS.isPostTitleValid(this.value.title);
    this.invalidMsg.title = !this.isValid.title ? 'Wprowadz tytuł' : '';
    return this.isValid.title;
  }

  isMarkValid(): boolean {
    this.isValid.markId = this.validationS.isMarkValid(this.value.markId);
    this.invalidMsg.markId = !this.isValid.markId ? 'Wybierz markę' : '';
    return this.isValid.markId;
  }

  isModelValid(): boolean {
    this.isValid.model = this.validationS.isModelValid(this.value.model) && this.value.model.length > 0;
    this.invalidMsg.model = !this.isValid.model ? 'Wybierz model' : '';
    return this.isValid.model;
  }

  setAllMarks(): void {
    this.postS
      .getAllMarks()
      .subscribe(data => {
        this.value.marks = data['result'];
      });
  }

  setAllModels() {
    this.postS
      .getAllModels()
      .subscribe(data => {
        this.value.models = data['result'];
      });
  }

  isMileageValid() {
    this.isValid.mileage = !isNaN(Number(this.isValid.mileage)) && this.value.mileage >= 0;
    this.value.mileage = this.clearFirstZero(this.value.mileage);
    return this.isValid.mileage;
  }

  isProductionYearValid() {
    this.isValid.productionYear = !isNaN(Number(this.isValid.productionYear)) && this.value.productionYear > 1900;
    this.value.productionYear = this.clearFirstZero(this.value.productionYear);
    return this.isValid.productionYear;
  }

  clearFirstZero(number: number) {
    let result = "";
    let n = number.toString();
    let isZeroFromStart = true;
    for (let i = 0; i < number.toString().length; ++i) {
      if (isZeroFromStart && number.toString().charAt(i) != '0') isZeroFromStart = false;
      if (!isZeroFromStart) {
        result += n.charAt(i);
      }
    }
    return Number(result);
  }

  uploadFileEvent(event: Event) {
    // @ts-ignore
    let fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; ++i) {
      let file: File = fileList[i];
      this.value.photos.push(file);
    }
  }

  updatePreview() {
    let preview = [];
    for (let i = 0; i < this.value.photos.length; ++i) {
      let reader = new FileReader();
      reader.onloadend = function () {
        preview.push(reader.result);
      };
      reader.readAsDataURL(this.value.photos[i]);
    }
    this.value.photosPreview = preview;
  }

  isPhotosDescriptionValid() {
    this.isValid.photosDescription = this.validationS.isPhotosDescriptionValid(this.value.photosDescription);
    return this.isValid.photosDescription;
  }

  addLastPhotosAndDescriptions(): void {
    if (this.value.photosPreview.length > 0 || this.value.photosDescription.length > 0) {
      let lastPhotosAndDescription = [this.value.photosPreview, this.value.photosDescription];
      this.value.photosAndDescription.push(lastPhotosAndDescription);
      this.value.photos = [];
      this.value.photosPreview = [];
      this.value.photosDescription = '';
    }
  }

  editPhotosAndDescription(i: number) {
    this.value.photosPreview = this.value.photosAndDescription[i][0];
    this.value.photosDescription = this.value.photosAndDescription[i][1];
    this.value.photosAndDescription.splice(i, 1);
  }

  removePhotoPreview(i: number) {
    this.value.photosPreview.splice(i, 1);
  }

  isCountryValid() {
    this.isValid.country = this.validationS.isCountryValid(this.value.country);
    this.invalidMsg.country = !this.isValid.country ? 'Wybierz kraj' : '';
    return this.isValid.country
  }

  isRegionValid() {
    this.isValid.region = this.validationS.isRegionValid(this.value.region);
    this.invalidMsg.region = !this.isValid.region ? 'wybierz region' : '';
    return this.isValid.region;
  }

  isCityValid() {
    this.isValid.city = this.validationS.isCityValid(this.value.city);
    this.invalidMsg.city = !this.isValid.city ? 'Wpisz miasto' : '';
    return this.isValid.city;
  }

  callWhenClickOnMapka = (country, region, regionName) => {
    if (!this.isCountryValid()) {
      this.value.country = region;
      this.updateCountries();
      this.updateRegions();
      this.updateUserSalonByCountry();
    } else {
      this.value.region = region;
    }
  }

  updateCountries() {
    let mapkaHtmlTagId = 'mapka0';
    if (this.value.country.length > 0) {
      this.mapkaS.generateRegions(this.value.country, mapkaHtmlTagId, this.callWhenClickOnMapka);
    } else {
      this.mapkaS.generateCountries(mapkaHtmlTagId, this.callWhenClickOnMapka);
    }
  }

  updateRegions() {
    if (this.value.country.length > 0) {
      this.value.regions = this.mapkaS.getRegionsCodeAndName(this.value.country);
    }
  }

  updateClickedRegionOnMapka() {
    let mapkaHtmlTagId = 'mapka0';
    this.mapkaS.generateRegionsAndClickByCode(this.value.country, mapkaHtmlTagId, this.callWhenClickOnMapka, this.value.region);
  }

  isSalonValid() {
    if (this.authenticateS.isAuthenticate() && (this.authenticateS.isAuthenticateCommission() || this.authenticateS.isAuthenticateBroker())) {
      return this.value.pickedSalon.length > 0;
    }
    return true;
  }

  updateUserSalonByCountry() {
    if (this.authenticateS.isAuthenticate() && (this.authenticateS.isAuthenticateCommission() || this.authenticateS.isAuthenticateBroker())) {
      if (this.isCountryValid()) {
        this.postS.getAllSalonsByUserId(this.authenticateS.getAuthenticateUser().id)
          .subscribe(data => {
              this.value.salons = [];
              for (let ele of data['result']) {
                if (ele.country === this.value.country) {
                  let salon = new SalonModel();
                  salon.id = ele._id;
                  salon.name = ele.name;
                  salon.country = ele.country;
                  salon.address = ele.address;
                  salon.zip = ele.zip;
                  salon.city = ele.city;
                  salon.phones = ele.phones;
                  this.value.salons.push(salon);
                }
              }
            }
          );
      }
    }
  }

  isSalonPicked() {
    for (let ele of this.value.salons) {
      if (this.value.pickedSalon === ele.id) {
        this.value.salon = ele;
        return true;
      }
    }
    return false;
  }

  isPriceValid() {
    this.isValid.price = this.value.price > 0;
    this.invalidMsg.price = !this.isValid.price ? 'cena nie moze byc 0' : '';
    return this.isValid.price
  }

  setStates() {
    this.stateS
      .getAllStates()
      .subscribe(data => {
        for (let ele of data['result']) {
          this.value.states.push([ele['_id'], ele['name']]);
        }
      });
  }

  private setFuels() {
    this.fuelS
      .getAllFuels()
      .subscribe(data => {
        for (let ele of data['result']) {
          this.value.fuels.push([ele['_id'], ele['name']]);
        }
      });
  }

  isEnginePowerValid() {
    return true;
  }

  isEngineDisplacementValid() {
    return true
  }

  private setEngineDrives() {
    this.driveS
      .getAllDrives()
      .subscribe(data => {
        for (let ele of data['result']) {
          this.value.engineDrives.push([ele['_id'], ele['name']]);
        }
      });
  }

  isEngineDriveValid() {
    this.isValid.engineDrive = this.value.engineDrive.length > 0;
    this.invalidMsg.engineDrive = !this.isValid.engineDrive ? 'wybierz napęd' : '';
    return this.isValid.engineDrive;
  }

  private setEngineGearboxes() {
    this.gearboxS
      .getAllGearboxes()
      .subscribe(data => {
        for (let ele of data['result']) {
          this.value.engineGearboxes.push([ele['_id'], ele['name']]);
        }
      });
  }

  isBodySeatsValid() {
    return true;
  }

  isBodyDoorsValid() {
    return true;
  }

  isBodyColorValid() {
    return true;
  }


  private setEquipments() {
    this.equipmentS
      .getAllEquipments()
      .subscribe(data => {
        for (let ele of data['result']) {
          this.value.equipments.push([ele['_id'], ele['name']]);
        }
      });
  }

  updateEquipment(equipmentId: string, equipmentName: string, event) {
    let isChecked = event.target.checked;
    if (isChecked) {
      this.value.equipment.push([equipmentId])
    } else {
      this.value.equipment = this.value.equipment.filter((val, index, arr) => {
        return val[0] !== equipmentId;
      });
    }
  }

  private setLoginEmail() {
    this.value.email = this.authenticateS.getAuthenticateUser().email;
  }

  isEmailValid() {
    this.isValid.email = this.registrationFormV.isEmailValid(this.value.email);
    this.invalidMsg.email = !this.isValid.email ? 'Wprowadz email' : '';
    return this.isValid.email;
  }

  isNameValid() {
    this.isValid.name = this.value.name.length > 0;
    this.invalidMsg.name = !this.isValid.name ? 'Wprowadz imie' : '';
    return this.isValid.name;
  }

  isPhoneValid() {
    this.isValid.phone = this.registrationFormV.isPhoneValid(this.value.phone);
    this.invalidMsg.phone = 'Wprowadz numer';
    return this.isValid.phone;
  }

  private setLanguages() {
    this.value.languages = this.languageS.getAllNativeLanguages();
    this.setDefaultPhoneLanguage();
  }

  private setDefaultPhoneLanguage() {
    this.value.phoneLanguages[0] = this.languageS.getFirstBrowserLangCode();
  }

  addPhone() {
    if (this.value.phone.length <= 0 && !this.isPhoneValid()) return;
    this.value.phones.push([this.value.phone, this.value.phoneLanguages[0], this.value.phoneLanguages[1], this.value.phoneLanguages[2]])
    this.value.phone = '';
    this.value.phoneLanguages = [];
  }

  isNewPhoneCanBeAdded() {
    if (this.authenticateS.isAuthenticateBroker()) {
      return this.value.phones.length <= 3;
    } else if (this.authenticateS.isAuthenticateCommission()) {
      return this.value.phones.length <= 2;
    } else if (this.authenticateS.isAuthenticateIndividual()) {
      return this.value.phones.length <= 1;
    } else {
      return false;
    }
  }

  deletePhoneAndLang(phoneLangs) {
    this.value.phones = this.value.phones.filter((value, index, arr) => {
      return value[0] !== phoneLangs[0];
    })
  }

  editPhoneAndLang(phoneLangs) {
    this.value.phone = phoneLangs[0];
    let langs = [];
    if (phoneLangs[1]) langs.push(phoneLangs[1]);
    if (phoneLangs[2]) langs.push(phoneLangs[2]);
    if (phoneLangs[3]) langs.push(phoneLangs[3]);
    this.value.phoneLanguages = langs;
    this.deletePhoneAndLang(phoneLangs);
  }

  setPostDaysLength(number) {
    this.value.dayLength = number;
  }

  isDayLengthValid() {
    this.isValid.dayLength = this.value.dayLength <= 0;
    this.invalidMsg.dayLength = !this.isValid.dayLength ? 'Trzeba wskazac ilosc dni' : '';
    return this.isValid.dayLength;
  }

  setWhenStartFrom(when) {
    this.value.whenStartFrom = when;
  }

  setMinStartFrom() {
    let now = new Date();
    let y = now.getFullYear().toString();
    let m = (now.getMonth() + 1).toString();
    let d = now.getDate().toString();
    m = m.length < 2 ? '0' + m : m;
    d = d.length < 2 ? '0' + d : d;
    this.value.minStartFrom = y + '-' + m + '-' + d;
  }

  setMaxStartFrom() {
    let now = new Date();
    let m = (now.getMonth() + 1).toString();
    let y = (m === '12' ? now.getFullYear() + 1 : now.getFullYear()).toString();
    m = (now.getMonth() + 1) === 12 ? '01' : (now.getMonth() + 2).toString();
    let d = now.getDate().toString();
    m = m.length < 2 ? '0' + m : m;
    d = d.length < 2 ? '0' + d : d;
    this.value.maxStartFrom = y + '-' + m + '-' + d;
  }

  private setPromotions() {
    this.promotionS
      .getAllPromotions()
      .subscribe(data => {
        for (let ele of data['result']) {
          let pro = new PromotionModel();
          pro.id = ele._id;
          pro.name = ele.name;
          pro.duration = ele.duration;
          pro.description = ele.description;
          this.value.promotions.push(pro);
        }
      });
  }

  isPromotionPicked(id: string) {
    return id && this.value.promotion.id === id;
  }

  setPromotion(promotion: PromotionModel) {
    this.value.promotion = promotion;
  }

  setUserSubscriptions() {
    this.subscriptionS
      .getAllUserSubscriptions(this.authenticateS.getAuthenticateUser().id)
      .subscribe(data => {
        for (let ele of data['result']) {
          let us = new UsersubscriptionModel();
          us.id = ele._id;
          us.userId = ele.userId;
          us.subscriptionId = ele.subscriptionId;
          us.subscriptionName = ele.subscriptionName;
          us.postAmount = ele.postAmount;
          us.postMade = ele.postMade;
          us.startIn = ele.startIn;
          us.endIn = new Date(ele.endIn);
          this.value.usersubscriptions.push(us);
          if (!this.value.selectedUsersubscriptionId) {
            this.value.selectedUsersubscriptionId = us.id;
            this.value.usersubscription = us;
          }
        }

      });
  }

  setUserSubscription() {
    for (let ele of this.value.usersubscriptions) {
      if (ele.id === this.value.selectedUsersubscriptionId) {
        this.value.usersubscription = ele;
      }
    }
  }

  isFuture(endIn: Date) {
    return endIn > new Date();
  }

  convertLangCodeToLangName(phoneLang: string) {
    return this.languageS.getNativeNameByCode(phoneLang);
  }

  private setDefaultCountry() {
    let browserCountry = this.countryS.getBrowserCountry().toUpperCase();
    for (let ele of this.mapkaS.getCountriesCodeAndName()) {
      if (ele[0] === browserCountry) {
        this.value.country = browserCountry;
        this.updateCountries();
        break;
      }
    }
  }

  isRegulationAccept() {
    this.isValid.isRegulationAccept = this.value.isRegulationAccept;
    this.invalidMsg.isRegulationAccept = !this.isValid.isRegulationAccept ? 'Przed dodawaniem należy zapoznać się z regulaminem serwisu i zaakceptować go' : '';
    return this.isValid.isRegulationAccept;
  }

  isRodoAccept() {
    this.isValid.isRodoAccept = this.value.isRodoAccept;
    this.invalidMsg.isRodoAccept = !this.isValid.isRodoAccept ? 'Przed dodawaniem musimy otrzymac zgodę na przetwarzania danych osobowych' : '';
    return this.isValid.isRodoAccept;
  }

  previewPost() {
    let post = this.preparePost();
  }

  addPost() {
    let post = this.preparePost();
  }

  isCurrencyValid() {
    this.isValid.currency = this.value.currency.length > 0;
    this.invalidMsg.currency = !this.isValid.currency ? 'Wybierz walutę' : '';
    return this.isValid.currency;
  }

  isStateValid() {
    this.isValid.state = this.value.state.length > 0;
    this.invalidMsg.state = !this.isValid.state ? 'Wybierz stan' : '';
    return this.isValid.state;
  }

  isFuelValid() {
    this.isValid.fuel = this.value.fuel.length > 0;
    this.invalidMsg.fuel = !this.isValid.fuel ? 'Wybeirz rodzaj paliwa' : '';
    return this.isValid.fuel;
  }

  isEngineGearboxValid() {
    this.isValid.engineGearbox = this.value.engineGearbox.length > 0;
    this.invalidMsg.engineGearbox = !this.isValid.engineGearbox ? 'Wybierz skrzynie biegów' : '';
    return this.isValid.engineGearbox;
  }

  verifyForm(): void {
    this.isCatPicked();
    this.isTitleValid();
    this.isMarkValid();
    this.isModelValid();
    this.isMileageValid();
    this.isProductionYearValid();
    this.isCountryValid();
    this.isRegionValid();
    this.isCityValid();
    this.isPriceValid();
    this.isCurrencyValid();
    this.isStateValid();
    this.isFuelValid();
    this.isEngineDriveValid();
    this.isEngineGearboxValid();
    this.isNameValid();
    this.isEmailValid();
    this.isDayLengthValid();
    this.isRegulationAccept();
    this.isRodoAccept();
  }

  isFormValid(): boolean {
    return this.isCatPicked() && this.isTitleValid() && this.isMarkValid() && this.isModelValid() && this.isMileageValid()
      && this.isProductionYearValid() && this.isCountryValid() && this.isRegionValid() && this.isCityValid()
      && this.isPriceValid() && this.isCurrencyValid() && this.isStateValid() && this.isFuelValid() && this.isEngineDriveValid()
      && this.isEngineGearboxValid() && this.isNameValid() && this.isEmailValid()
      && this.isDayLengthValid() && this.isRegulationAccept() && this.isRodoAccept();
  }

  preparePost() {
    this.verifyForm();
    if (!this.isFormValid()) return;
    let post = new PostModel();
    post.category = this.value.pickedCat;
    post.title = this.value.title.trim();
    post.markId = this.value.markId;
    post.modelBodyId = this.value.model[0];
    post.modelId = this.value.model[1];
    post.mileAge = this.value.mileage;
    post.productionYear = this.value.productionYear;
    if (this.value.photosPreview.length > 0 || this.value.photosDescription.length > 0) {
      this.addLastPhotosAndDescriptions();
    }
    post.photosAndDescription = this.value.photosAndDescription;

    post.country = this.value.country;
    post.region = this.value.region;
    post.city = this.value.city;
    post.range = this.value.range;
    post.salonId = this.value.pickedSalon;

    post.price = this.value.price;
    post.isPriceNetto = this.value.isPriceNetto;
    post.isGiveInvoce = this.value.isGiveInvoice;
    post.currency = this.value.currency;

    post.state = this.value.state;
    post.isDmg = this.value.isDmg;
    post.isFirstDriver = this.value.isFirstDriver;
    post.isNoAccidents = this.value.isNoAccidents;
    post.hasCarBook = this.value.hasCarBook;
    post.fuel = this.value.fuel;
    post.engineDisplacement = this.value.engineDisplacement;
    post.enginePower = this.value.enginePower;
    post.engineDrive = this.value.engineDrive;
    post.engineGearbox = this.value.engineGearbox;
    post.bodySeats = this.value.bodySeats;
    post.bodyDoors = this.value.bodyDoors;
    post.bodyColor = this.value.bodyColor;
    post.equipment = this.value.equipment;
    post.extraEquipment = this.value.extraEquipment;
    post.vin = this.value.vin;

    post.contactName = this.value.name;
    post.contactEmail = this.value.email;
    post.contactPhone = this.value.phones;
    post.amountOfDays = this.value.dayLength;
    post.startDate = new Date(this.value.startFrom);
    post.resumption = this.value.resumption;
    post.promotionDuration = this.value.promotion.duration;
    post.userSubscriptionId = this.value.usersubscription.id;
    post.isActive = false;

    post.createOn = new Date();
    if (this.authenticateS.isAuthenticate()) {
      post.createById = this.authenticateS.getAuthenticateUser().id;
    } else {
      post.createById = "";
    }
    return post;
  }

  isStartFromValid() {

  }
}
