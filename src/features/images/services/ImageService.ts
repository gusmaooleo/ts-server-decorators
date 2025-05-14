import { Service } from "../../../core";
import { IImageService } from "../interfaces/IImagesService";


@Service()
export class ImageService implements IImageService {
  getImage(): string {
    return "dsadasd";
  }
}