import {DeserializableModel} from "./deserializable.model";

export class CompanyModel implements DeserializableModel {
  id: string;
  nip: string;
  nipEu: string;
  name: string;
  personName: string;
  personSurname: string;
  country: string;
  address: string;
  zip: string;
  city: string;
  phone: string;
  creatorId: string;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
