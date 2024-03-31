import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';

const PREFIX = '/proxy';

const absoluteUrlRegExp = new RegExp('^(?:[a-z+]+:)?//', 'i');

const apiProxy = proxy('https://acomics.ru', {
  proxyReqPathResolver: req => req.originalUrl.substring(PREFIX.length),
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    if (!process.env.BROWSER_LOGIN) {
      proxyReqOpts.headers['Cookie'] = `username=${process.env.LOGIN}; hash=${process.env.HASH}; PHPSESSID=${process.env.PHPSESSID}`;
    }
    return proxyReqOpts;
  },
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    if (headers['location'] && !absoluteUrlRegExp.test(path))
    {
      headers['location'] = PREFIX + headers['location'];
    }
    return headers;
  }
});

const router = express.Router();

router.use('/*', apiProxy);

export default router;
