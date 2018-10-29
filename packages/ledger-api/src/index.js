const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

module.exports = () => {
  const server = express();
  const create = (config) => {
    let routes = require('./routes');
    const {
      env,
      port,
      hostname,
      viewDir
    } = config;
    
    server.set('env', env);
    server.set('port', port);
    server.set('hostname', hostname);
    server.set('viewDir', viewDir);
    
    server.use(bodyParser.json());

    server.engine('.hbs', expressHandlebars({
      defaultLayout: 'default',
      layoutsDir: `${viewDir}/layouts`,
      extname: '.hbs'
    }));

    server.set('views', server.get('viewDir'));
    server.set('view engine', '.hbs');

    routes.init(server);
  };

  const start = () => {
    let hostname = server.get('hostname'),
        port = server.get('port');

    server.listen(port, () => {
      console.log(`server listening on ${hostname}:${port}`);
    });
  };

  return {
    create,
    start
  };
};

