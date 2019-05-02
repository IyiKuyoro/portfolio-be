import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import logger from './logger';
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Server is running in http://localhost:${PORT}`,
  });
});

export default app;
