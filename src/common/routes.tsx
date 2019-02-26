import { makeRouteConfig, Route } from 'found';
import React from 'react';
import Home from './layouts/Home';
import Relayers from './layouts/Relayers';
import Tokens from './layouts/Tokens';
import Trades from './layouts/Trades';
import Trade from './layouts/Trade';
import NotFound from './layouts/NotFound';
import { Providers } from './layouts/Providers';

const routes = (
  <Route path="/" Component={Providers}>
    <Route Component={Home} />
    <Route path="/relayers" Component={Relayers} />
    <Route path="/tokens" Component={Tokens} />
    <Route path="/trades" Component={Trades} />
    <Route path="/trades/:uuid" Component={Trade} />
    <Route path="*" Component={NotFound} />
  </Route>
);
export default makeRouteConfig(routes);
