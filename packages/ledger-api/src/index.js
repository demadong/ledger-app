import express from 'express';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';

const server = express() 
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
}

