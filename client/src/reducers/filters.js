import * as TYPES from '../actions/types';

const initialState = {
    active: true,
    q: null,
};

function reducer(filters = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case TYPES.USERS_LIST_FILTERS:
            return {...filters, ...payload};
        default:
            return filters;
    }
}


export default reducer;
