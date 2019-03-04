import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import {
  setTokens,
  setTokensLoading,
  setToken,
  setTokenLoading,
  setTokenChart,
  setTokenChartLoading
} from '../actions/token';
import Epic from './epic';
import { HYDROSCAN_API_URL } from '../lib/config';

export const fetchTokensLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS'),
    map(() => {
      return setTokensLoading({ loading: true });
    })
  );

export const fetchTokens: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS'),
    flatMap(action => {
      const { page, pageSize, tab } = action.payload;
      return fetch(
        `${HYDROSCAN_API_URL}/api/v1/tokens?page=${page || 1}&pageSize=${pageSize || 25}&filter=${tab || '24H'}`
      );
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((json: any) => [
      setTokens({
        tokens: json.tokens,
        page: json.page,
        pageSize: json.pageSize,
        total: json.count
      }),
      setTokensLoading({ loading: false })
    ]),
    catchError((error: Error) => [console.log(error), setTokensLoading({ loading: false })])
  );

export const fetchTokenChartLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN_CHART'),
    map(() => {
      return setTokenChartLoading({ loading: true });
    })
  );

export const fetchTokenChart: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN_CHART'),
    flatMap(action => {
      return fetch(
        `${HYDROSCAN_API_URL}/api/v1/tokens/${action.payload.address}/chart?filter=${action.payload.tab || '1M'}`
      );
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((chartData: any[]) => [setTokenChart({ chartData }), setTokenChartLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTokenChartLoading({ loading: false })])
  );

export const fetchTokenLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN'),
    map(() => {
      return setTokenLoading({ loading: true });
    })
  );

export const fetchToken: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN'),
    flatMap(action => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/tokens/${action.payload.address}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((token: any) => [setToken({ token }), setTokenLoading({ loading: false })]),
    catchError((error: Error) => [console.log(error), setTokenLoading({ loading: false })])
  );
