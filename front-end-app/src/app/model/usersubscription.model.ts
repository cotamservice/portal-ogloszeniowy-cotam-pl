import {DeserializableModel} from "./deserializable.model";

export class UsersubscriptionModel implements DeserializableModel {
  id: string;
  userId: string;
  subscriptionId: string;
  subscriptionName: string;
  postAmount: number;
  postMade: number;
  startIn: Date;
  endIn: Date;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
