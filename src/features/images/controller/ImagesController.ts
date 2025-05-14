import { Request, Response } from "express";
import { Controller, Get, Middleware, Post } from "../../../core";
import { imageMiddleware } from "../middlewares/imageMiddleware";


@Controller("/images")
export class ImagesController {

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
}