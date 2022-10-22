import * as TYPES from '../actions/types';

const initialState = [];

function userReducer(users = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case TYPES.RETRIEVE_USERS:
            return payload;

        case TYPES.RETRIEVE_USER:
            return users.length > 0 ?
                users.map((user) => (user._id === payload._id) ? payload : user) :
                [payload];

        case TYPES.CREATE_USER:
            return [...users, payload];

        case TYPES.UPDATE_USER:
            return users.map((user) => (user._id === payload._id) ? {...user, ...payload} : user)

        case TYPES.DELETE_USER:
            return users.filter(({id}) => id !== payload._id);

        default:
            return users;
    }
}

export default userReducer;
