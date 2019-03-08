import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { setTokens, setTokensLoading, setToken, setTokenLoading } from '../actions/token';
import { setNotFound } from '../actions/notFound';
import Epic from './epic';
import { HYDROSCAN_API_URL } from '../lib/config';
import { formatAddress } from '../lib/formatter';

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
      const { page, pageSize, tab, keyword, relayerAddress, traderAddress } = action.payload;
      return fetch(
        `${HYDROSCAN_API_URL}/api/v1/tokens?page=${page || 1}&pageSize=${pageSize || 25}&filter=${tab ||
          '24H'}&keyword=${keyword || ''}&relayerAddress=${
          relayerAddress ? formatAddress(relayerAddress) : ''
        }&traderAddress=${traderAddress ? formatAddress(traderAddress) : ''}`
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
    catchError((error: Error) => [setTokensLoading({ loading: false })])
  );

export const fetchTokenLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN'),
    map(() => {
      return setTokenLoading({ loading: true });
    })
  );

export const fetchToken: Epic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TOKEN'),
    flatMap(action => {
      const { address } = action.payload;
      return fetch(`${HYDROSCAN_API_URL}/api/v1/tokens/${formatAddress(address)}`);
    }),
    flatMap(response => {
      if (response.status > 400) {
        throw response.status;
      }
      return response.json();
    }),
    map(body => body as any),
    flatMap((token: any) => [setToken({ token }), setTokenLoading({ loading: false })]),
    catchError((error: Error) => [setTokenLoading({ loading: false }), setNotFound({ notFound: true })])
  );
