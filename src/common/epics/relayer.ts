import fetch from 'isomorphic-fetch';
import { catchError, filter, flatMap, map } from 'rxjs/operators';
import { setRelayers, setRelayersLoading } from '../actions/relayer';
import Epic from './epic';
import { HYDROSCAN_API_URL } from '../lib/config';

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
    catchError((error: Error) => [console.log(error), setRelayersLoading({ loading: false })])
  );
