import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import routerInvoice from './routes/invoice';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

(async () => {
  try {
    app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to api server');
    });

    app.use('/invoice', routerInvoice);

    httpServer.listen(port, () => {
      console.log(`[server] Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[server] Failed to connect Prisma:', error);
  }
})();
