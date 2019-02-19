import express from 'express';

import { createServer } from '@christophediprima/razzle-react-redux-observable-found';

import rootEpic from './common/epics';
import rootReducer from './common/reducers';
import routes from './common/routes';

import Document, { DocumentExtraProps } from './common/layouts/Document';
import { styleSheets } from './common/layouts/Providers';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

const initialState = {};

const serverConfig = createServer<any, any, DocumentExtraProps>({
  document: { Component: Document, props: { styleSheets } },
  initialState,
  razzleAssets,
  rootEpic,
  rootReducer,
  routes,
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

export default server;
