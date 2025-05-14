import { Inject, Service } from "../../../core";
import { IImageRepository } from "../interfaces/IImageRepository";
import { IImageService } from "../interfaces/IImagesService";

@Service()
export class ImageService implements IImageService {

  @Inject("ImageRepository")
  private readonly imageRepository!: IImageRepository;
  
  getImage(): object {
    return {name: "image-a", url: "image-a/url"};
  }

  getAllImages(): object[] {
    return this.imageRepository.find();
  }
}