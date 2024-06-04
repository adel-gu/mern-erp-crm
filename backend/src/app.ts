import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import auth from './controllers/auth';

import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import appRouter from './routes/appApi';

import AppErrorHandler from './handlers/errors/appErrorHandler';
import errorRequestHandler from './handlers/errors/errorControllerHandler';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', auth.checkAuthToken, adminRouter);
app.use('/api/v1', auth.checkAuthToken, appRouter);

// Catch errors route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppErrorHandler(`can't find ${req.originalUrl} on this server!`, 404),
  );
});

app.use(errorRequestHandler);

export default app;
