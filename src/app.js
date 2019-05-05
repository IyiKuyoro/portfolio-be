import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import RespondEx from '@respondex/core';

import router from './routes';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Iyi-Kuyoro's web API",
    success: true,
  });
});

app.get('*', (req, res) => {
  RespondEx.errorByType(
    'NotFound',
    res,
  );
});

export default app;
