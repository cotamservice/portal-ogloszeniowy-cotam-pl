import {DeserializableModel} from "./deserializable.model";

export class SubscriptionModel implements DeserializableModel {
  id: string;
  name: string;
  postAmount: number;
  postLeft: number;
  startIn: Date;
  endIn: Date;
  description: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
