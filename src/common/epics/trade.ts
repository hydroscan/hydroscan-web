import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { setTrades, setTradesLoading, setTradesIndicators, setTradesChart } from '../actions/trade';
import Epic from './epic';

export const fetchTrades: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    map(() => {
      return setTradesLoading(true);
    }),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((trades: any[]) => [setTrades({ trades }), setTradesLoading(false)]),
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
    flatMap((trades: any[]) => [setTrades({ trades }), setTradesLoading(false)]),
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
