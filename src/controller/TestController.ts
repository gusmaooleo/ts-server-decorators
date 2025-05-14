import { Request, Response } from "express";
import { Controller, Get } from "../decorators/controller";
import { ITestService } from "../interfaces/ITestService";


@Controller('/test')
export class TestController {
  constructor(private readonly testService: ITestService) {}

  @Get('/get/:id')
  getMethod = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    return this.testService.get();
  }
}