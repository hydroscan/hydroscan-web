import { makeRouteConfig, Route } from 'found';
import React from 'react';
import Home from './layouts/Home';
import Relayers from './layouts/Relayers';
import Tokens from './layouts/Tokens';
import Trades from './layouts/Trades';
import Trade from './layouts/Trade';
import Token from './layouts/Token';
import NotFound from './layouts/NotFound';
import { fetchTrades, fetchTrade, fetchTradesIndicators, fetchTradesChart, fetchTradesLatest } from './actions/trade';
import { fetchTokens, fetchToken, fetchTokenChart, fetchTokensTop } from './actions/token';
import { fetchRelayers } from './actions/relayer';
import { Providers } from './layouts/Providers';

const routes = (
  <Route path="/" Component={Providers}>
    <Route
      Component={Home}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTradesLatest());
          context.store.dispatch(fetchTradesIndicators());
          context.store.dispatch(fetchTradesChart({ filter: '1M' }));
          context.store.dispatch(fetchTokensTop({ filter: '24H' }));
          context.store.dispatch(fetchTradesLatest());

          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/relayers"
      Component={Relayers}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchRelayers());
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/tokens"
      Component={Tokens}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTokens({}));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/trades"
      Component={Trades}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTrades({}));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/trades/:uuid"
      Component={Trade}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTrade({ uuid: params.uuid }));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/tokens/:address"
      Component={Token}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchToken({ address: params.address }));
          context.store.dispatch(fetchTrades({ tokenAddress: params.address }));
          context.store.dispatch(fetchTokenChart({ address: params.address, filter: '1M' }));
          resolve({ store: context.store });
        })
      }
    />
    <Route path="*" Component={NotFound} />
  </Route>
);
export default makeRouteConfig(routes);
