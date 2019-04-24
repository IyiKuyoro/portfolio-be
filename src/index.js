import express from 'express';
import morgan from 'morgan';

import logger from './logger';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(morgan('dev'));

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
