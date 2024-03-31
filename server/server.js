import express from 'express';
import path from 'path';
import logger from './logger.js';
import proxyRouter from './proxyRouter.js';

const app = express();

app.use(express.static(path.resolve('static')));

app.use('/proxy', proxyRouter);

// Run server
const port = ++process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Dev server started at: http://localhost:${port}/`);
});
