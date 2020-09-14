import {DeserializableModel} from "./deserializable.model";
import {CategoryModel} from "./category.model";

export class PostModel implements DeserializableModel {
  id: string;
  category: string;
  title: string;
  markName: string;
  markId: string;
  modelBodyName: string;
  modelBodyId: string;
  modelName: string;
  modelId: string;
  mileAge: number;
  productionYear: number;
  photosAndDescription: Array<string>;
  createOn: Date;
  createById: string;
  country: string;
  region: string;
  city: string;
  range: number;


  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
