import fetch from 'isomorphic-fetch';
import { catchError, delay, filter, flatMap, map } from 'rxjs/operators';
import { setTrades, setTradesLoading } from '../actions/trade';
import Epic from './epic';

export const tradesLoading: Epic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    map(() => {
      return setTradesLoading(true);
    })
  );

export const fetchTrades: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === 'FETCH_TRADES'),
    delay(1),
    flatMap(() => {
      return fetch(`${process.env.RAZZLE_HYDROSCAN_API_URL}/api/v1/trades`);
    }),
    flatMap(response => response.json()),
    map(body => body as any[]),
    flatMap((trades: any[]) => [setTrades({ trades }), setTradesLoading(false)]),
    catchError((error: Error) => [console.log(error), setTradesLoading(false)])
  );
