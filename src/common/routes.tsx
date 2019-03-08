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
import NoResult from './layouts/NoResult';
import { fetchTrades, fetchTrade, fetchTradesIndicators, fetchTradesChart, fetchTrader } from './actions/trade';
import { fetchTokens, fetchToken } from './actions/token';
import { fetchRelayers, fetchRelayer } from './actions/relayer';
import { Providers } from './layouts/Providers';
import { isServer } from './lib/config';

let history: number = 0;

const routes = (
  <Route path="/" Component={Providers}>
    <Route
      Component={Home}
      getData={({ params, context }) =>
        new Promise(resolve => {
          // hack for first time loading agian in the client side
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchTradesIndicators());
          context.store.dispatch(fetchTradesChart({ tab: '1M' }));
          context.store.dispatch(fetchTokens({ pageSize: 10, tab: '24H' }));
          context.store.dispatch(fetchTrades({ pageSize: 8 }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/relayers"
      Component={Relayers}
      getData={({ params, context }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchRelayers());

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/tokens"
      Component={Tokens}
      getData={({ params, context, location }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          // back to tokens page: delta === -1
          const page = location.delta === -1 ? context.store.getState().token.page : 1;
          const { keyword, relayerAddress, traderAddress } = location.query;
          context.store.dispatch(fetchTokens({ page, keyword, relayerAddress, traderAddress }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/trades"
      Component={Trades}
      getData={({ params, context, location }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          // back to trades page: delta === -1
          // const page = location.delta === -1 ? context.store.getState().token.page : 1;
          const page = 1;
          const { baseTokenAddress, quoteTokenAddress, transaction } = location.query;
          context.store.dispatch(fetchTrades({ page, baseTokenAddress, quoteTokenAddress, transaction }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/trades/:uuid"
      Component={Trade}
      getData={({ params, context }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchTrade({ uuid: params.uuid }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/tokens/:address"
      Component={Token}
      getData={({ params, context }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchToken({ address: params.address }));
          context.store.dispatch(fetchTrades({ tokenAddress: params.address }));
          context.store.dispatch(fetchTradesChart({ tokenAddress: params.address, tab: '1M' }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/relayers/:slug"
      Component={Relayer}
      getData={({ params, context }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchRelayer({ slug: params.slug }));
          context.store.dispatch(fetchTrades({ relayerAddress: params.address }));
          context.store.dispatch(fetchTradesChart({ relayerAddress: params.address, tab: '1M' }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route
      path="/traders/:address"
      Component={Trader}
      getData={({ params, context }) =>
        new Promise(resolve => {
          if (!isServer() && history === 0) {
            history = history + 1;
            return resolve({ store: context.store });
          }

          context.store.dispatch(fetchTrader({ address: params.address }));
          context.store.dispatch(fetchTrades({ traderAddress: params.address }));
          context.store.dispatch(fetchTradesChart({ traderAddress: params.address, tab: '1M' }));

          history = history + 1;
          resolve({ store: context.store });
        })
      }
    />
    <Route path="/no_result" Component={NoResult} />
    <Route path="*" Component={NotFound} />
  </Route>
);
export default makeRouteConfig(routes);
