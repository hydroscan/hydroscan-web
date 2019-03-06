import { makeRouteConfig, Route } from 'found';
import React from 'react';
import Home from './layouts/Home';
import Relayers from './layouts/Relayers';
import Relayer from './layouts/Relayer';
import Tokens from './layouts/Tokens';
import Trades from './layouts/Trades';
import Trade from './layouts/Trade';
import Trader from './layouts/Trader';
import Token from './layouts/Token';
import NotFound from './layouts/NotFound';
import { fetchTrades, fetchTrade, fetchTradesIndicators, fetchTradesChart, fetchTrader } from './actions/trade';
import { fetchTokens, fetchToken } from './actions/token';
import { fetchRelayers, fetchRelayer } from './actions/relayer';
import { Providers } from './layouts/Providers';

const routes = (
  <Route path="/" Component={Providers}>
    <Route
      Component={Home}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTradesIndicators());
          context.store.dispatch(fetchTradesChart({ tab: '1M' }));
          context.store.dispatch(fetchTokens({ pageSize: 10, tab: '24H' }));
          context.store.dispatch(fetchTrades({ pageSize: 8 }));

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
      getData={({ params, context, location }) =>
        new Promise(resolve => {
          // back to tokens page: delta === -1
          const page = location.delta === -1 ? context.store.getState().token.page : 1;
          const { keyword, relayerAddress, traderAddress } = location.query;
          context.store.dispatch(fetchTokens({ page, keyword, relayerAddress, traderAddress }));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/trades"
      Component={Trades}
      getData={({ params, context, location }) =>
        new Promise(resolve => {
          // back to trades page: delta === -1
          // const page = location.delta === -1 ? context.store.getState().token.page : 1;
          const page = 1;
          const { baseTokenAddress, quoteTokenAddress, transaction } = location.query;
          context.store.dispatch(fetchTrades({ page, baseTokenAddress, quoteTokenAddress, transaction }));
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
          context.store.dispatch(fetchTradesChart({ tokenAddress: params.address, tab: '1M' }));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/relayers/:slug"
      Component={Relayer}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchRelayer({ slug: params.slug }));
          context.store.dispatch(fetchTrades({ relayerAddress: params.address }));
          context.store.dispatch(fetchTradesChart({ relayerAddress: params.address, tab: '1M' }));
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/traders/:address"
      Component={Trader}
      getData={({ params, context }) =>
        new Promise(resolve => {
          context.store.dispatch(fetchTrader({ address: params.address }));
          context.store.dispatch(fetchTrades({ traderAddress: params.address }));
          context.store.dispatch(fetchTradesChart({ traderAddress: params.address, tab: '1M' }));
          resolve({ store: context.store });
        })
      }
    />
    <Route path="*" Component={NotFound} />
  </Route>
);
export default makeRouteConfig(routes);
