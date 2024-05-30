import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import adminAuth from './controllers/coreControllers/authController';
import meController from './controllers/coreControllers/meController';

import coreAuthRouter from './routes/coreRoutes/coreAuth';
import coreMeRouter from './routes/coreRoutes/coreMeApi';

import AppErrorHandler from './handlers/errors/appErrorHandler';
import errorRequestHandler from './handlers/errors/errorControllerHandler';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', coreAuthRouter);
app.use('/api/v1/admin/profile', adminAuth.checkAuthToken, coreMeRouter);

// Catch errors route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppErrorHandler(`can't find ${req.originalUrl} on this server!`, 404),
  );
});

app.use(errorRequestHandler);

export default app;
