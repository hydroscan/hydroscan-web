import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { setRelayers, setRelayersLoading, setRelayer, setRelayerLoading } from '../actions/relayer';
import Epic from './epic';
import { HYDROSCAN_API_URL } from '../lib/config';
import { setNotFound } from '../actions/notFound';

export const fetchRelayersLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_RELAYERS'),
    map(() => {
      return setRelayersLoading({ loading: true });
    })
  );

export const fetchRelayers: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_RELAYERS'),
    map(() => {
      return setRelayersLoading({ loading: true });
    }),
    flatMap(() => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/relayers`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((relayers: any[]) => [setRelayers({ relayers }), setRelayersLoading({ loading: false })]),
    catchError((error: Error) => [setRelayersLoading({ loading: false })])
  );

export const fetchRelayerLoading: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_RELAYER'),
    map(() => {
      return setRelayerLoading({ loading: true });
    })
  );

export const fetchRelayer: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_RELAYER'),
    flatMap(action => {
      return fetch(`${HYDROSCAN_API_URL}/api/v1/relayers/${action.payload.address}`);
    }),
    flatMap(response => {
      if (response.status > 400) {
        throw response.status;
      }
      return response.json();
    }),
    map(body => body as any),
    flatMap((relayer: any) => [setRelayer({ relayer }), setRelayerLoading({ loading: false })]),
    catchError((error: Error) => [setRelayerLoading({ loading: false }), setNotFound({ notFound: true })])
  );
