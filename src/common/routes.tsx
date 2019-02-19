import { makeRouteConfig, Route } from 'found';
import React from 'react';
import { fetchTrades } from './actions/trade';
import Home from './layouts/Home';
import { Providers } from './layouts/Providers';

const routes = (
  <Route path="/" Component={Providers}>
    <Route
      Component={Home}
      getData={({ location, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTrades());
          resolve({ store: context.store });
        })
      }
    />
  </Route>
);
export default makeRouteConfig(routes);
