import {combineReducers} from 'redux';
import users from './users';
import filters from './filters';

export default combineReducers({
    users, filters
});
