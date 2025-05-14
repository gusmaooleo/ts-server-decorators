import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { loadDomainModules } from './core/loadDomainModules';
import { registerControllers } from './core/registerController';

const app = express();
app.use(cors());
app.use(express.json())

const bootstrap = async () => {
  await loadDomainModules();
  await registerControllers(app);

  app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.url} not registered in the application.`, timestamp: new Date().toISOString() })
  })
  
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal error' });
  });

  app.listen(3698, () => console.log('app running on :3698'))
}

bootstrap();