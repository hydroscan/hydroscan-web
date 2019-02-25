import fetch from 'isomorphic-fetch';
import { catchError, delay, filter, flatMap, map } from 'rxjs/operators';
import { setTokens, setTokensLoading } from '../actions/token';
import Epic from './epic';

export const tokensLoading: Epic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS'),
    map(() => {
      return setTokensLoading(true);
    })
  );

export const fetchTokens: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS'),
    delay(1),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/tokens`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((tokens: any[]) => [setTokens({ tokens }), setTokensLoading(false)]),
    catchError((error: Error) => [console.log(error), setTokensLoading(false)])
  );

export const fetchTokensTop: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS_TOP'),
    delay(1),
    flatMap(action => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/tokens_top?filter=${action.payload.filter}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((tokens: any[]) => [setTokens({ tokens }), setTokensLoading(false)]),
    catchError((error: Error) => [console.log(error), setTokensLoading(false)])
  );
