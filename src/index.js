import http from 'http';

import logger from './logger';
import app from './app';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Server is running in http://localhost:${PORT}`,
  });
});

export default app;
