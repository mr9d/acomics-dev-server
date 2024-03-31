import express from 'express';
import proxy from 'express-http-proxy';

const PREFIX = '/proxy';

const apiProxy = proxy('https://acomics.ru', {
  proxyReqPathResolver: req => req.originalUrl.substring(PREFIX.length),
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Cookie'] = `username=${process.env.LOGIN}; hash=${process.env.HASH}; PHPSESSID=${process.env.PHPSESSID}`;
    return proxyReqOpts;
  },
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    if (headers['location'])
    {
      headers['location'] = PREFIX + headers['location'];
    }
    return headers;
  }
});

const router = express.Router();

router.use('/*', apiProxy);

export default router;
