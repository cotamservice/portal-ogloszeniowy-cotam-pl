import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../model/category.model";
import {PostFormValidationService} from "../../service/form/post-form-validation.service";
import {PostService} from "../../service/post/post.service";

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

  }

  isValid = {
    title: true,
    markId: true,
    marks: true,
    model: true,
    models: true,
    mileage: true,
    productionYear: true,
  }

  invalidMsg = {
    title: '',
    markId: '',
    model: '',
    marks: '',
    models: '',
    mileage: '',
    productionYear: '',
  };


  constructor(
    private validationS: PostFormValidationService,
    private postS: PostService,
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
}
