import {DeserializableModel} from "./deserializable.model";
import {CategoryModel} from "./category.model";

export class PostModel implements DeserializableModel {
  id: string;
  category: string;
  title: string;
  markName: string;
  modelBodyName: string;
  modelName: string;
  mileAge: number;
  productionYear: number;
  photosAndDescription: Array<string>;
  createOn: Date;
  createById: string;
  country: string;
  region: string;
  city: string;
  range: number;
  salonId: string;
  price: number;
  currency: string;
  isPriceNetto: boolean;
  isGiveInvoce: boolean
  state: string;
  isDmg: boolean;
  isFirstDriver: boolean;
  isNoAccidents: boolean;
  hasCarBook: boolean;
  fuel: string;
  engineDisplacement: number;
  enginePower: number
  engineDrive: string;
  engineGearbox: string;
  bodySeats: number;
  bodyDoors: number;
  bodyColor: string;
  equipment: Array<string>
  extraEquipment: Array<string>
  vin: string;
  contactName:string;
  contactEmail:string;
  contactPhone: Array<Array<string>>;
  amountOfDays: number;
  startDate: Date;
  resumption: boolean;
  promotionDuration: number;
  userSubscriptionId: string;
  isActive: boolean;
  postNumber: string;


  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
