import {RolesModel} from "./roles.model";
import {DeserializableModel} from "./deserializable.model";

export class UserModel implements DeserializableModel {
  id: string;
  email: string;
  password: string;
  roles: Array<RolesModel>;
  secretWord: string;
  isGoogleAuthenticate: boolean;
  isFBAuthenticate: boolean;

  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
