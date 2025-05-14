import { Service } from "../decorators/service";
import { ITestService } from "../interfaces/ITestService";

@Service()
export class TestService implements ITestService {
  get(): string {
    return "return GET method";
  }
  post(): string {
    return "return GET method";
  }
  put(): string {
    return "return GET method";
  }
  delete(): string {
    return "return GET method";
  }
}
