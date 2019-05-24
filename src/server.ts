import express from 'express';
import { createServer } from '@wlchn/razzle-react-redux-observable-found';
import rootEpic from './common/epics';
import rootReducer from './common/reducers';
import routes from './common/routes';
import Document, { DocumentExtraProps } from './common/layouts/Document';
import { styleSheets } from './common/layouts/Providers';
import morgan from 'morgan';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');

const initialState = {};

const serverConfig = createServer<any, any, DocumentExtraProps>({
  document: { Component: Document, props: { styleSheets } },
  initialState,
  razzleAssets,
  rootEpic,
  rootReducer,
  routes
});

const server = express();

server.use(morgan('common'));

server.get('/ping', (req, res) => res.send('pong'));

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default server;
