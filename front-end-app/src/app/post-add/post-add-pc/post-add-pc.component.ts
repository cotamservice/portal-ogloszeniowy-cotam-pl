import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../model/category.model";
import {PostFormValidationService} from "../../service/form/post-form-validation.service";
import {PostService} from "../../service/post/post.service";
import {PostModel} from "../../model/post.model";
import {AuthenticateService} from "../../service/authenticate/authenticate.service";

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
  };


  constructor(
    private validationS: PostFormValidationService,
    private postS: PostService,
    private authenticateS: AuthenticateService,
  ) {
  }

  ngOnInit(): void {
    this.setAllMarks();
    this.setAllModels();
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
    return this.validationS.isPostTitleValid(this.value.title);
  }

  isMarkValid(): boolean {
    return this.validationS.isMarkValid(this.value.markId);
  }

  isModelValid(): boolean {
    return this.validationS.isModelValid(this.value.model);

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

  verifyForm(): void {
    this.isCatPicked();
    this.isTitleValid();
    this.isMarkValid();
    this.isModelValid();
    this.isMileageValid();
    this.isProductionYearValid();
  }

  isFormValid(): boolean {
    return this.isCatPicked() && this.isTitleValid() && this.isMarkValid() && this.isModelValid() && this.isMileageValid()
      && this.isProductionYearValid();
  }

  addLastPhotosAndDescriptions(): void {
    let lastPhotosAndDescription = [this.value.photosPreview, this.value.photosDescription];
    this.value.photosAndDescription.push(lastPhotosAndDescription);
    this.value.photos =[];
    this.value.photosPreview = [];
    this.value.photosDescription = '';
  }

  preparePost() {
    this.verifyForm();
    if (this.isFormValid()) {
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
      // start country

      post.createOn = new Date();
      if (this.authenticateS.isAuthenticate()) {
        post.createById = this.authenticateS.getAuthenticateUser().id;
      } else {
        post.createById = "";
      }
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
}
