import {DeserializableModel} from "./deserializable.model";

export class CarModelModel implements DeserializableModel {
  id: string;
  name: string;
  modelBodyId: string;
  markId: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
