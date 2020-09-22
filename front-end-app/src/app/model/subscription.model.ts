import {DeserializableModel} from "./deserializable.model";

export class SubscriptionModel implements DeserializableModel {
  id: string;
  name: string;
  postAmount: number;
  description: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
