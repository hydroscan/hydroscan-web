import { combineEpics } from 'redux-observable';

import * as trade from './trade';
import * as token from './token';

const epics = [...Object.values(trade), ...Object.values(token)];

export default combineEpics(...epics);
