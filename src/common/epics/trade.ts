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
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades?page=${action.payload.page}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((res: any) => [
      setTrades({
        trades: res.trades,
        page: res.page,
        pageSize: res.pageSize,
        totalPage: res.totalPage,
        total: res.count
      }),
      setTradesLoading(false)
    ]),
    catchError((error: Error) => [console.log(error), setTradesLoading(false)])
  );

export const fetchTradesLatest: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES_LATEST'),
    map(() => {
      return setTradesLoading(true);
    }),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades_latest`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((trades: any[]) => [setTradesLatest({ tradesLatest: trades }), setTradesLoading(false)]),
    catchError((error: Error) => [console.log(error), setTradesLoading(false)])
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
    map(body => body as any[]),
    flatMap((trade: any[]) => [setTrade({ trade })]),
    catchError((error: Error) => [console.log(error)])
  );
