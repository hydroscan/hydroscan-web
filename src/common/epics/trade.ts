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
  setTradesLatest,
  setTradesLatestLoading
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
      const { page, tokenAddress } = action.payload;
      return fetch(`${HYDROSCAN_API_URL}/api/v1/trades?page=${page || 1}&tokenAddress=${tokenAddress || ''}`);
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

export const fetchTradesLatestLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_LATEST'),
    map(() => {
      return setTradesLatestLoading({ loading: true });
    })
  );

export const fetchTradesLatest: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_LATEST'),
    flatMap(() => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/trades?pageSize=8`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((json: any) => [
      setTradesLatest({ tradesLatest: json.trades }),
      setTradesLatestLoading({ loading: false })
    ]),
    catchError((error: Error) => [console.log(error), setTradesLatestLoading({ loading: false })])
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
      return fetch(`${HYDROSCAN_API_URL}/api/v1/trades_chart?filter=${action.payload.filter || '1M'}`);
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
