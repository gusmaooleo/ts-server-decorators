import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { registerControllers } from './core/registerController';
import './controller/TestController';



const app = express();
app.use(cors());
app.use(express.json())

const bootstrap = async () => {
  await registerControllers(app);

  app.listen(3698, () => console.log('app running on :3698'))
}

bootstrap();