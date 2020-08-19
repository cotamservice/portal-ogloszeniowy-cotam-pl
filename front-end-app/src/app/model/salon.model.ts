import {DeserializableModel} from "./deserializable.model";

export class SalonModel  implements DeserializableModel  {
  id: string;
  name: string;
  country: string;
  address: string;
  zip: string;
  city: string;
  phones: Array<string>;
  creatorId: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
