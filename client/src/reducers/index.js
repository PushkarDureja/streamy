import {authReducer} from './authreducer';
import {streamReducer} from './streamreducer';
import {combineReducers} from 'redux';
import flashMessages from './flashreducer';

const rootReducer = combineReducers({
    user : authReducer,
    stream : streamReducer,
    flash : flashMessages
})
export default rootReducer