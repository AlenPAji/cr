import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import config from './config/env.config';

import indexRouter from './routes/index';
import departmentRouter from './routes/department'
var db=require('./database/connection')
    
    
const app: Express = express();

db.connect();
// Use morgan logger only in development
if (config.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Basic error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use('/api/', indexRouter);
app.use('/api/department',departmentRouter)


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(errorHandler);

const port = config.PORT;

app.listen(process.env.PORT||4000, () => {
  console.log(`Server is running in ${config.NODE_ENV} mode on port ${port}`);
});

export default app;