import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import coreAuthRouter from './routes/coreRoutes/coreAuth';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', coreAuthRouter);

export default app;
