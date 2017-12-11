'use store';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { info } from './reducers';
let rootReducers = combineReducers({info});
let store = createStore(rootReducers, applyMiddleware(ReduxThunk));
export default store;