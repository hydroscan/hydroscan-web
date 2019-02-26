import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { setTokens, setTokensLoading, setTokensTop } from '../actions/token';
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
    flatMap(action => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/tokens?page=${action.payload.page}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any),
    flatMap((res: any) => [
      setTokens({
        tokens: res.tokens,
        page: res.page,
        pageSize: res.pageSize,
        totalPage: res.totalPage,
        total: res.count
      }),
      setTokensLoading(false)
    ]),
    catchError((error: Error) => [console.log(error), setTokensLoading(false)])
  );

export const fetchTokensTop: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKENS_TOP'),
    flatMap(action => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/tokens_top?filter=${action.payload.filter}`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((tokens: any[]) => [setTokensTop({ tokensTop: tokens })]),
    catchError((error: Error) => [console.log(error)])
  );
