import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import {
  setTrades,
  setTradesLoading,
  setTradesIndicators,
  setTradesChart,
  setTrade,
  setTradesLatest
} from '../actions/trade';
import Epic from './epic';

export const fetchTrades: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    map(action => {
      setTradesLoading(true);
      return action;
    }),
    flatMap(action => {
      const { page, tokenAddress } = action.payload;
      return fetch(
        `${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades?page=${page ? page : ''}&tokenAddress=${
          tokenAddress ? tokenAddress : ''
        }`
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
      setTradesLoading(false)
    ]),
    catchError((error: Error) => [console.log(error), setTradesLoading(false)])
  );

export const fetchTradesLatest: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_LATEST'),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades?pageSize=8`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((json: any) => [setTradesLatest({ tradesLatest: json.trades })]),
    catchError((error: Error) => [console.log(error)])
  );

export const fetchTradesIndicators: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_INDICATORS'),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades_indicators`);
    }),
    flatMap(response => response.json()),
    map(body => body),
    flatMap((indicators: any) => [setTradesIndicators({ indicators })]),
    catchError((error: Error) => [console.log(error)])
  );

export const fetchTradesChart: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_CHART'),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades_chart`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((chartData: any[]) => [setTradesChart({ chartData })]),
    catchError((error: Error) => [console.log(error)])
  );

export const fetchTrade: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADE'),
    flatMap(action => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades/${action.payload.uuid}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((trade: any) => [setTrade({ trade })]),
    catchError((error: Error) => [console.log(error)])
  );
