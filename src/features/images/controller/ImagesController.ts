import { Request, Response } from "express";
import { Controller, Delete, Get, Inject, Middleware, Post } from "../../../core";
import { imageMiddleware } from "../middlewares/imageMiddleware";
import { IImageService } from "../interfaces/IImagesService";

@Controller("/images")
export class ImagesController {

  @Inject("ImageService")
  private readonly imagesService!: IImageService;

  @Middleware(imageMiddleware)
  @Get("/")
  getImage = async (req: Request, res: Response) => {
    return res.status(200).json({ image: "image/url" })
  }
  
  @Middleware(imageMiddleware)
  @Get("/:id")
  getByIdImage = async (req: Request, res: Response) => {
    return res.status(200).json({ image: "image/url", id: req.params.id })
  }
  
  @Post("/")
  postImage = async (req: Request, res: Response) => {
    return res.status(200).json({ image: "image/url", status: "created" })
  }

  @Delete("/")
  deleteImage = async (req: Request, res: Response) => {
    return res.status(200).json({ message: this.imagesService.getImage() })
  }
}