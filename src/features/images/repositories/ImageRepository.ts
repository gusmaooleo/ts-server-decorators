import { Repository } from "../../../core";
import { IImageRepository } from "../interfaces/IImageRepository";

@Repository()
export class ImageRepository implements IImageRepository {
  find(): object[] {
    return [
      {name: "image-a", url: "image-a/url"},
      {name: "image-b", url: "image-b/url"},
      {name: "image-c", url: "image-c/url"},
    ]
  }
}