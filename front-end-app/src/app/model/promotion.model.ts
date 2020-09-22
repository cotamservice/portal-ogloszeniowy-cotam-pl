import {DeserializableModel} from "./deserializable.model";

export class PromotionModel implements DeserializableModel {
  id: string;
  name: string;
  duration: number;
  description: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
