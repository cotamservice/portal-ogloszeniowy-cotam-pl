import {DeserializableModel} from "./deserializable.model";
import {CategoryModel} from "./category.model";

export class PostModel implements DeserializableModel {
  id: string;
  category: CategoryModel;


  deserializable(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
