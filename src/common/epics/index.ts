import { combineEpics } from 'redux-observable';

import * as trade from './trade';
import * as token from './token';
import * as relayer from './relayer';

const epics = [...Object.values(trade), ...Object.values(token), ...Object.values(relayer)];

export default combineEpics(...epics);
