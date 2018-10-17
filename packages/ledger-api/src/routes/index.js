const
      apiRoute = require('./api')
      homeRoute = require('./home')
      errorRoute = require('./error');


const init = (server) => {
  server.get('*', (req, res, next) => {
    console.log('req made to: ', -req.originalUrl);
    return next();
  });

  server.get('/', (req, res, next) => {
    res.redirect('/home');
  });

  server.use('/api', apiRoute);
  server.use('/home', homeRoute);
  server.use('/error', errorRoute);
};

module.exports = {
  init
};

