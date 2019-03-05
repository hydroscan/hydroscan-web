import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import {
  setTrades,
  setTradesLoading,
  setTradesIndicators,
  setTradesIndicatorsLoading,
  setTradesChart,
  setTradesChartLoading,
  setTrade,
  setTradeLoading,
  setTrader,
  setTraderLoading
} from '../actions/trade';
import Epic from './epic';
import { HYDROSCAN_API_URL } from '../lib/config';

export const fetchTradesLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    map(() => {
      return setTradesLoading({ loading: true });
    })
  );

export const fetchTrades: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    map(action => {
      setTradesLoading({ loading: true });
      return action;
    }),
    flatMap(action => {
      const {
        page,
        pageSize,
        tokenAddress,
        baseTokenAddress,
        quoteTokenAddress,
        relayerAddress,
        traderAddress
      } = action.payload;
      return fetch(
        `${HYDROSCAN_API_URL}/api/v1/trades?page=${page || 1}&pageSize=${pageSize || 25}&tokenAddress=${tokenAddress ||
          ''}&baseTokenAddress=${baseTokenAddress || ''}&quoteTokenAddress=${quoteTokenAddress ||
          ''}&relayerAddress=${relayerAddress || ''}&traderAddress=${traderAddress || ''}`
      );
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((json: any) => [
      setTrades({
        trades: json.trades,
        page: json.page,
        pageSize: json.pageSize,
        total: json.count
      }),
      setTradesLoading({ loading: false })
    ]),
    catchError((error: Error) => [console.log(error), setTradesLoading({ loading: false })])
  );

export const fetchTradesIndicatorsLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_INDICATORS'),
    map(() => {
      return setTradesIndicatorsLoading({ loading: true });
    })
  );

export const fetchTradesIndicators: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_INDICATORS'),
    flatMap(() => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/trades_indicators`);
    }),
    flatMap(response => response.json()),
    map(body => body),
    flatMap((indicators: any) => [setTradesIndicators({ indicators }), setTradesIndicatorsLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTradesIndicatorsLoading({ loading: false })])
  );

export const fetchTradesChartLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_CHART'),
    map(() => {
      return setTradesChartLoading({ loading: true });
    })
  );

export const fetchTradesChart: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_CHART'),
    flatMap(action => {
      const { tab, tokenAddress, traderAddress, relayerAddress } = action.payload;
      return fetch(
        `${HYDROSCAN_API_URL}/api/v1/trades_chart?filter=${tab || '1M'}&tokenAddress=${tokenAddress ||
          ''}&traderAddress=${traderAddress || ''}&relayerAddress=${relayerAddress || ''}`
      );
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((chartData: any[]) => [setTradesChart({ chartData }), setTradesChartLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTradesChartLoading({ loading: false })])
  );

export const fetchTradeLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADE'),
    map(() => {
      return setTradeLoading({ loading: true });
    })
  );

export const fetchTrade: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADE'),
    flatMap(action => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/trades/${action.payload.uuid}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((trade: any) => [setTrade({ trade }), setTradeLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTradeLoading({ loading: false })])
  );

export const fetchTraderLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADER'),
    map(() => {
      return setTraderLoading({ loading: true });
    })
  );

export const fetchTrader: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADER'),
    flatMap(action => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/traders/${action.payload.address}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((trader: any) => [setTrader({ trader }), setTraderLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTraderLoading({ loading: false })])
  );
